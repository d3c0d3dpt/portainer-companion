# Portainer Companion

Command Line utility to update a Docker Stacks on Portainer.

## Configuration

Define the following environment variables to configure Portainer connection:
* `PORTAINER_URL`: Url for Portainer access (ex: http://127.0.0.1:9000/); 
* `PORTAINER_USERNAME`: Username for Portainer login;
* `PORTAINER_PASSWORD`: Username for Portainer password;

## Installation (suggested)

Install the package globally:
* `npm i -g portainer-companion`

## Usage

On the command-line:
* `portainer-companion #stack_name# #stack_definition_file#`
