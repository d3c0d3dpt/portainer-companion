# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2019-01-17
### Added
- `update-stack-variable` command to update a stack variable.

### Changed
- Command-line input parsed via `commander` package.

## [1.3.0] - 2019-01-15
### Changed
- `ALWAYS_UPDATE` swapped for `FORCE_UPDATE`.
- Code clean-up.
- Main file relocation.

## [1.2.1] - 2019-01-12
### Updated
- Git repo references.

## [1.2.0] - 2019-01-11
### Added
- Multi architecture docker builds (amd64 & arm).

## [1.1.0] - 2019-01-11
### Added
- Possibility to force update even if stack hasn't changed.

## [1.0.1] - 2019-01-10
### Added
- Validation to check if required Environment variables are set.

## [1.0.0] - 2019-01-10
### Added
- Basic functionality to update docker stacks.
