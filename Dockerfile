FROM heroku/cedar:14

WORKDIR /opt/workspace

ENV N_PREFIX=/home/jenkins \
    HOME=/home/jenkins \
    PATH="/home/jenkins/bin:$PATH"

RUN set -x \
    && echo "jenkins:x:1000:1000:Jenkins,,,:/home/jenkins:/bin/bash" >> /etc/passwd \
    && echo "jenkins:x:1000:" >> /etc/group \
    && mkdir -p /home/jenkins \

    && git clone https://github.com/tj/n.git /tmp/n \
    && cd /tmp/n \
    && PREFIX=/home/jenkins make install \
    && rm -rf /tmp/n \

    && apt-get update \
    && apt-get install -y libssl-dev \
    && cd /tmp && wget https://github.com/AGWA/git-crypt/archive/0.5.0.zip \
    && unzip 0.5.0.zip && cd git-crypt-0.5.0/ \
    && make && make install \

    && curl -L https://github.com/tcnksm/ghr/releases/download/pre-release/linux_amd64.zip > /tmp/ghr.zip \
    && cd /tmp \
    && unzip ghr.zip \
    && mv ghr /home/jenkins/bin/ghr \

    && sed -i 's|\(ENV_PATH\sPATH\)=\(.\+\)|\1=/home/jenkins/bin:\2|g' /etc/login.defs \
    && mkdir -p /opt/workspace \
    && chown 1000:1000 -R /home/jenkins \
    && chown 1000:1000 -R /opt/workspace \

    && apt-get clean \
    && apt-get autoremove \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

ADD package.json /opt/workspace/package.json
ADD scripts/docker/symlink.node_modules /opt/workspace/scripts/docker/symlink.node_modules
ADD scripts/docker/install.required.node /opt/workspace/scripts/docker/install.required.node
RUN chown 1000:1000 -R /opt/workspace \
    && su -p -c '/opt/workspace/scripts/docker/install.required.node' jenkins

ADD scripts/docker/prepare.for.ci /opt/workspace/scripts/docker/prepare.for.ci
ADD npm-shrinkwrap.json /opt/workspace/npm-shrinkwrap.json
RUN chown 1000:1000 -R /opt/workspace \
    && su -p -c '/opt/workspace/scripts/docker/prepare.for.ci' jenkins

USER jenkins
