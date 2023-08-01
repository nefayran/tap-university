
# Tap university assignment

### Test task description:
For the entrance examination of Tap University, which emphasizes comprehensive ability, applicants will be selected in two stages based on the results of the first examination (5 subjects: English, mathematics, science, Japanese, and Geography/History, each with a maximum score of 100 points).


## Key Features

- Divisions Dashboard: You can manipulate and configure the system through CRUD operations  -  with divisions
- Subjects Dashboard: You can manipulate and configure the system through CRUD operations with subjects 
- Conditions Dashboard: You can manipulate and configure the system through a flexible wizard of conditions 
- Examine Dashboard: You can input examine results through user-friendly data table and see your results on the fly
- Environment agnostic solution through using .env files
- Separate layers for frontend application with API layer, store (repository) layer, service layer, common components, and smart containers
- Separate layers for backend application: controllers, services (repositories are redundant in this case)
- Domain focus solution, domain models, and business rules contains in the backend "domain" layer
- Monorepo solution with using pnpm-workspaces and shared models backend to frontend
## Possible improvements
      
        
- Conditions: Add more condition types, add more tables to cover all cases with different conditions (SUM BY SUBJECT, etc.)
- Translations: Add i18 and translations 
- Security: Add auth and HTTPS support 
- Save examines: Add save button to examines and add a dashboard to view/delete saved examines tables 
- Testing: Add Unit, E2E tests (I just save my time but it is possible)
      
## Tech Stack
      
- Frontend: VueJS 3, Vuetify 3, Pinia 
- Backend: NestJS, Swagger, CORS, Mongoose 
- Database: MongoDB 
- Docker: Docker, Docker compose 

## Architecture  
<p align="center">
  <img alt="Way Logo" src="https://github.com/nefayran/tap-university/blob/master/diagrams/Layers.v1.png">
</p>

## Packages installation

Install packages with pnpm

```bash
  pnpm install
```
    
## Run Locally (development)

Install dependencies (see step packages installation)
Use the following command to run development:
```bash
  pnpm dev
```

## Build models
Use the following command to build models:
```bash
  pnpm build:models
```
## Docker

To run the project through docker-compose use the following command:

```bash
  docker-compose up
```

