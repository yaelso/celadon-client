# celadon-client
<sub>A C18 Ada Developers Academy web frontend capstone completed in 3 weeks</sub>

Celadon is a gamified task management web app for busy students and lifelong learners where users can cleanly organize multiple task lists by context categories and level Pokemon for each task completed.

<sub>[Sibling repository can be found here](https://github.com/yaelso/CeladonApi)</sub>

![Latest Release](https://img.shields.io/github/v/release/yaelso/celadon-client?include_prereleases)  ![License](https://img.shields.io/github/license/yaelso/celadon-client)

## Learning Goals
- Demonstrate self direction, time management, and independent learning
- Learn and implement new technologies for both development and deployment
- Complete a product life cycle from conception to delivery, including deployment
- Utilize agile practices to assist project completion
- Implement complex relationships between components and cleanly manage multiple moving parts on both the front and back end
- Explore user authentication and data persistence

## Features
Users can login via Google and access a number of views, varying from a dashboard that contains all productivity models belonging to a user, an archive, a Pokedex, and a personal profile.

- User login and auth via Google
- Category, list, and task creation
- Archived and favorite checklists, task scheduling, and task progress/completion status markers
- Incrementable habits
- Pokemon collection, EXP gathering, and leveling

## Usage Notes
This client repository lacks Firebase configuration keys! To run locally, you can hook up your own Firebase auth configuration values to the appropriate keys contained in `src/firebase.ts`. 

## Features
Users can login via Google and access a number of views, varying from a dashboard that contains all productivity models belonging to a user, an archive, a Pokedex, and a personal profile.

#### Dashboard View
- Category, list, and task creation and deletion
- Checklist favorites and archive actions
- Task progress and completion status markers
- Task scheduling

#### Profile View
- Basic user information display
- Incrementable habits with EXP awards
- Scheduled task display
- Basic calendar view
- Current active Pokemon display
- Favorite checklist display

#### Archive View
- Archived checklist display

#### Pokedex View
- Current collected User Pokemon display, with data grabbed from PokeApi
- EXP and level displays
- Active Pokemon selection switches

## Installation
1. Clone repository
2. Install dependencies by running `$ yarn install`
3. Plug in address of either locally running sibling backend or deployed CeladonApi under key `REACT_APP_DEV_API_ROOT` in .env
4. Plug in personal Firebase auth configuration values designated in `src/firebase.ts` or route `devConfig` in same file to Firebase config JSON placed in root
5. Run server via `yarn start`

### Dependencies
```json
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@fontsource/roboto": "^4.5.8",
    "@mui/icons-material": "^5.11.0",
    "@mui/material": "^5.11.6",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "axios": "^1.3.2",
    "firebase": "^9.16.0",
    "notistack": "^2.0.8",
    "pokenode-ts": "^1.17.0",
    "react": "^18.2.0",
    "react-calendar": "^4.0.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.7.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.0"
```
