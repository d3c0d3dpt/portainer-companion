# Portainer Companion

Command Line utility to update a Docker Stacks on Portainer.

## Configuration

Define the following environment variables to configure Portainer connection:
* `PORTAINER_URL`: Url for Portainer access (ex: http://127.0.0.1:9000/); 
* `PORTAINER_USERNAME`: Username for Portainer login;
* `PORTAINER_PASSWORD`: Username for Portainer password.

Use the following environment variables for behavior configuration
* `FORCE_UPDATE`: Update Portainer stack even if stack definition hasn't changed (defaults to `false`).

## Installation (suggested)

Install the package globally:
* `npm i -g portainer-companion`

## Usage

On the command-line:
* `portainer-companion #stack_name# #stack_definition_file# #force_update#`
  * `#stack_name#`: name of the Portainer stack to be updated;
  * `#stack_definition_file#`: file that contains the stack definition;
  * `#force_update#`: pass `true` to force update event if definition hasn't changed;
  
