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
1. Clone the repository:
```bash
git clone https://github.com/benjaminkost/chesshub-ui.git
```

2. Define .env
- copy `.env_sample` and rename it to `.env`
- define the values according to your system

3. Start project
```bash
docker compose up -d
```
## API Endpoints

| Endpoint                                      | Method | Description                                      |
| --------------------------------------------- | ------ | ------------------------------------------------ |
| /auth/register, /auth/signup                  | POST   | Register a User                                  |
| /uploadImage/api/auth/login, /api/auth/signin | GET    | Login a User                                     |
| /uploadImage                                  | POST   | Upload image get a chess game as a PGN-File back |
## Test it out

1. Open a browser and tip in: `http://localhost:9000`
2. Click around
## Architecture
- Framework: React + Vite
- API handling: Axios
- Build and deploy: Docker compose
## Problems
Create an Issue in the Issues section in this repository.
## License
This project is licensed under the MIT License. See `License` for details.
