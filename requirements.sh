#!/bin/bash
echo "Installing development dependencies..."
echo "download eerst Postgresql van de website!"
echo "heeft up postgresql geinstalleerd? y/n"

read postgresInstalled

if [ $postgresInstalled == "y" ]; then
    if psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='mitasco'" | grep -q 1; then
        echo 'user mitasco bestaat reeds';
    else
        psql -U postgres -c "CREATE USER mitasco WITH PASSWORD 'mitasco';"
    fi

    if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw mitasco; then
        echo 'database mitasco bestaat reeds';
    else
        psql -U postgres -c "CREATE DATABASE mitasco WITH ENCODING 'UTF8' TEMPLATE template0;"
    fi

fi

NODE_VERSION=6.2.1
NPM_VERSION=3.9.3

#
# Check if Homebrew is installed
#
which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    # https://github.com/mxcl/homebrew/wiki/installation
    /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
else
    brew update
fi

#
# Check if Git is installed
#
which -s git || brew install git

#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${NODE_VERSION}"
node --version | grep ${NODE_VERSION}
if [[ $? != 0 ]] ; then
    # Install Node
    cd `brew --prefix`
    $(brew versions node | grep ${NODE_VERSION} | cut -c 16- -)
    brew install node

    # Reset Homebrew formulae versions
    git reset HEAD `brew --repository` && git checkout -- `brew --repository`
fi

cd /tmp

#
# Check if Node Package Manager is installed and at the right version
#
echo "Checking for NPM version ${NPM_VERION}"
npm --version | grep ${NPM_VERSION}
if [[ $? != 0 ]] ; then
    echo "Downloading npm"
    git clone git://github.com/isaacs/npm.git && cd npm
    git checkout v${NPM_VERSION}
    make install
fi

#
# Ensure NODE_PATH is set
#
grep NODE_PATH ~/.bash_profile > /dev/null || cat "export NODE_PATH=/usr/local/lib/node_modules" >> ~/.bash_profile && . ~/.bash_profile

#
# Check if Gulp is installed
#
echo "Gulp"
npm install -g gulp

#
# Check if Typescript is installed
#
echo "Typescript"
npm install -g typescript@next

#
# Check if Typings is installed
#
echo "Typings"
npm install -g typings

#
# Check if db-migrate is installed
#
echo "Db migrate"
npm install -g db-migrate db-migrate-pg