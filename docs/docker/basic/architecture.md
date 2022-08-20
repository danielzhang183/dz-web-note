# Architecture

- The `Docker client` talks to the `Docker daemon`, by using a REST API, over UNIX socket or a network interface

## Docker client

> The Docker client (aka.`docker`) is primary way that many Docker users interact with Docker.

- The docker command uses the Docker API, the Docker client can carry theme out to talk to Docker daemon.
- The Docker client can communicate with more than one daemon.

## Docker Compose

> Docker Compose is Another Docker client, that lets you work with applications consisting of a set of containers.

## Docker daemon

- The Docker daemon (aka.`dockerd`) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes.
- A daemon can also communicate with other daemons to manage Docker services.

## Docker Registry

> A Docker registry stores Docker images.

- `Docker Hub`, public registry, can reachable for everyone, by default
- your own private registry, you can configured yourself

## Docker Image

> An image is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization.

To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it.

**What's advantage?**

- Each instruction in a Dockerfile creates a layer in the image.
- When you change the Dockerfile and rebuild the image, only those layers which have changed are `rebuilt`. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

## Docker Container

> A container is also a sandboxed process on your machine that is isolated from all other processes on the host machine.

That isolation leverages `kernel namespaces` and `cgroups`, features that have been in Linux for a long time. To summarize, a container:

- `is a runnable instance of an image`. You can create, start, stop, move, or delete a container using the DockerAPI or CLI.
- can be run on local machines, virtual machines or deployed to the cloud.
- is portable (can be run on any OS).
- is isolated from other containers and runs its own software, binaries, and configurations.

## The underlying technology

- Docker is written in the `Go` and takes advantage of several features of the Linux kernel to deliver its functionality.
- Docker uses a technology called `namespaces` to provide the isolated workspace called the `container`.
- When you run a container, Docker creates a set of namespaces for that container. These namespaces provide a layer of isolation. Each aspect of a container runs in a separate namespace and its access is limited to that namespace.
