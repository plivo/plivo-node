FROM ubuntu:18.04

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y wget git vim make

# Install node using nvm
RUN mkdir -p /usr/src/.nvm
ENV NVM_DIR /usr/src/.nvm
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | sh
ENV NODE_VERSION v14.0.0
RUN /bin/sh -c ". $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

# Copy setup script
COPY setup_sdk.sh /usr/src/app/
RUN chmod a+x /usr/src/app/setup_sdk.sh

ENTRYPOINT [ "/usr/src/app/setup_sdk.sh" ]