# Deployment with Docker & Kubernetes
## Introduction

Mitaco is deployed by dockerizing the application and deploying it in clusters on Google cloud or AWS.
For each customer production environment, there is a container for the database, and one (or multiple) container(s) for the application.

## Prerequisites
In order to deploy a new production version, you will need the following tools:

- [docker](https://www.docker.com/products/overview) 
- [gcloud SDK](https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version) 


Install kubernetes clustering: 

    gcloud components install kubectl

## Dockerfile
The dockerfile in the git repository defines the container for the application.

First build a new release:

    gulp --env production
    
Build docker container and tag it with the new version:

    docker build -t eu.gcr.io/$PROJECT_ID/mitasco:v1.0

Change v1.0 to the last version of the application.
$PROJECT_ID should be set to the name of the gcloud project. 