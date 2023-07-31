
# Tap university assignemnt

### Test task description:
For the entrance examination of Tap University, which emphasizes comprehensive ability,applicants will be selected in two stages based on the results of the first examination (5 subjects: English, mathematics, science, Japanese,and Geography/History, each with a maximum score of 100 points).


## Key Features

- Divisions Dashboard: You can manipulate and configure system through CRUD operations  -  with divisions
- Subjects Dashboard: You can manipulate and configure system through CRUD operations with subjects 
- Conditions Dashboard: You can manipulate and configure system through flexible wizard of conditions 
- Examine Dashboard: You can input examine results through user friendly data table and see your results on fly
- Enviroment agnostic solutin through using .env files
- Separate layers for frontend application with api layer, store (repository) layer, service layer, common components and smart containers
- Separate layers for backend application: controllers, services (repositories are redundant in this case)
- Domain focus solution, domain models and business rules contains in backend "domain" layer
- Monorepo solution with using pnpm-workpsaces and shared models backend to frontend
## Tech Stack
      
- Frontend: VueJS 3, Vuetify 3, Pinia 
- Backend: NestJS, Swagger, CORS, Mongoose 
- Database: MongoDB 
- Docker: Docker, Docker compose 
      
## Packages installation

Install packages with pnpm

```bash
  pnpm install
```
    
## Run Locally (development)

Install dependencies (see step packages installation)
Use the foolowing command to run development:
```bash
  pnpm dev
```

## Build models
Use the foolowing command to run development:
```bash
  pnpm build:models
```
## Docker

To run project through docker-compose use the following command:

```bash
  docker-compose up
```

