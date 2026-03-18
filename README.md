# Chesshub-ui
## Overview
This repository is part of a project called ChessHub. The ChessHub project is build with a Microservice-Architecture.

The chesshub-ui repository defines the service which is providing a web ui for the user interact with the other services. 
## Installation
### Prerequisites
- Docker
- Javascript
- npm
### Setup
#### 1. Clone the repository:
```bash
git clone https://github.com/benjaminkost/chesshub-ui.git
```

#### 2. Define .env
- copy `.env_sample` and rename it to `.env`
- define the values according to your system

#### 3. Start project
__Option A__
```bash
docker compose up -d
```
OR

__Option B__
```bash
npm i
npm run dev
```
#### 4. View UI
Open browser and type in:

__Option A__
```url
http://localhost:9000/
```
OR

__Option B__
```url
http://localhost:5173/
```
## Functionalities

| Endpoint                                      | Description                                                                            |
|-----------------------------------------------|----------------------------------------------------------------------------------------|
| /auth/register, /auth/signup                  | Register a User                                                                        |
| /uploadImage/api/auth/login, /api/auth/signin | Login a User                                                                           |
| /uploadImage                                  | Upload image of chess scoresheet to be transfered into digital representation with CNN |
| /ownGamesHistory                              | View all for your saved games                                                          |
| /teamGamesHistory                             | View all games from teams you are in                                                   |
| /view-game                                    | View single game on virtual chessboard                                                 |
| /club-affiliation                             | See all club affiliations and apply for membership to new clubs                        |



## Architecture
- Framework: React + Vite
- API handling: Axios
- Build and deploy: Docker compose
## Problems
Create an Issue in the Issues section in this repository.
