# Docker Node MongoDB Example

> Simple example of a dockerized Node/Mongo app

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```




## Things added that were not part of the original tutorials
1. mongo-express
This is an admin panel for mongodb kinda like phpmyadmin. I makes it easier for us to manage collections and various stuff when prototyping an app. It should either be removed in production or require an authentication if used in production so keep that in mind.