# Basic Concept

## Docker Container

a container is a sandboxed process on your machine that is isolated from all other processes on the host machine. That isolation leverages kernel namespaces and cgroups, features that have been in Linux for a long time. To summarize, a container:

- `is a runnable instance of an image`. You can create, start, stop, move, or delete a container using the DockerAPI or CLI.
- can be run on local machines, virtual machines or deployed to the cloud.
- is portable (can be run on any OS).
- is isolated from other containers and runs its own software, binaries, and configurations.

## Docker Image

- When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image.
- it must contain everything needed to run an application, such as
  - all dependencies
  - configurations
  - scripts
  - binaries
  - environment variables
  - a default command to run
  - other metadata
  - etc

## Docker Registry
