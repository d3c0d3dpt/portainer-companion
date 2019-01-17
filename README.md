# Portainer Companion

Command Line utility to update a Docker Stacks on Portainer.

## Configuration

Define the following environment variables to configure Portainer connection:
* `PORTAINER_URL`: Url for Portainer access (ex: http://127.0.0.1:9000/); 
* `PORTAINER_USERNAME`: Username for Portainer login;
* `PORTAINER_PASSWORD`: Password for Portainer login.

Use the following environment variables for behavior configuration
* `FORCE_UPDATE`: Update Portainer stack even if stack definition hasn't changed (defaults to `false`).

## Installation (suggested)

Install the package globally:
* `npm i -g portainer-companion`

## Usage

On the command-line:
* `portainer`, `portainer -h` or `portainer --help` to output usage information.

* `portainer update-stack-definition [options] <stack_name> <stack_file>` to update a stack definition on Portainer:
  * Alias(es): `usd`;
  * `<stack_name>`: name of the Portainer stack to be updated;
  * `<stack_file>`: file that contains the stack definition;
  * Available `options`:
    * `-f`, `--force`: force update (updates even if definition hasn't changed);
    * `-h`, `--help`:  output usage information.
    
* `portainer update-stack-variable <stack_name> <variable_name> [<variable_value>]` to update a stack variable on Portainer:
  * Alias(es): `usv`;
  * `<stack_name>`: name of the Portainer stack where variable will be updated;
  * `<variable_name>`: name of the variable to be updated;
  * `[<variable_value>]`: new value of the variable;
  * Notes:
    * If a variable with that name doesn't exists, it will be created.
    * If no value is given, the variable will be removed
