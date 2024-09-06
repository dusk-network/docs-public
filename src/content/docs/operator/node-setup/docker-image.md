---
title: Docker Image
description: This resource explains how to setup a Dusk node with Docker.
---

:::note[Caution]
The following guide is designed to assist in setting up a local node for testing and development purposes only. It is not recommended for production use. Docker is utilized here to facilitate convenient local testing and provide developers with a dedicated node for API testing
:::

If you've previously found the idea of setting up a Dusk node daunting due to the extensive setup instructions, we have good news. Thanks to Docker, we can provide a process that is greatly simplified. This guide will take you through the process using Docker, allowing you to run your own local Dusk node.

:::note[About Docker]
Docker wraps software in a software container that houses code, runtime, system tools, and system libraries that an application needs to run. This guarantees that the software will always run consistently, regardless of where it is installed.
:::


## Prerequisites

1. 🐳 **Docker**: If you don't have Docker installed, please follow the [official guide](https://docs.docker.com/desktop/)
2. 🛜 **Internet Connection**: Required to download the Docker image and necessary files.
3. 🛠️ **Git**: Optional, but recommended. Useful for retrieving the node code. Git can be downloaded [here](https://git-scm.com/downloads).
4. 💻 **Terminal**: To execute the steps in the Step-By-Step below, you will need to use a terminal application.
5. 🎛️ **x86-AMD64**: To create the Docker Image, a processor with the x86-AMD64 architecture is required.

:::tip[Using DockerHub]
If you want to quickstart using a prebuilt docker image, run the following command:
```sh
docker run -p 9000:9000/udp -p 8080:8080/tcp dusknetwork/node
```
:::

## Step-by-Step Instructions

### 1. Get the Dusk node files

The Dusk Node is called `Rusk`. There are two way to get the software, cloning the [repository](https://github.com/dusk-network/rusk.git) using git, or [simply downloading from github](#without-git)

##### Using Git (Recommended)

Execute the following commands on the terminal:

```sh
git clone https://github.com/dusk-network/rusk.git
```

##### Without Git

1. Go to the [Rusk Github repository](https://github.com/dusk-network/rusk).
2. Click the green "**Code**" button and choose "**Download ZIP**".
3. Extract the ZIP file.

### 2. Build the Docker Image

With Docker installed and the repository files obtained, let's build the Docker image. Note that this can take 15 to 20 minutes. 

The following command will download all the required dependencies and set up the environment for your Dusk node.

```sh
docker build -t rusk .
```

### 3. Run the Dusk node with Docker

Once the image is built, you can run a Dusk node simply by running in your terminal:

```sh
docker run -p 9000:9000/udp -p 8080:8080/tcp rusk
```

Your node should now be running and giving you output on the blocks it is creating and validating.
