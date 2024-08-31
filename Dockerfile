FROM cypress/base:18.20.3
WORKDIR /app
COPY package*.json .
COPY cypress cypress
COPY cypress.config.js .
COPY reporter.js .
COPY start.sh .
RUN chmod +x start.sh

RUN npm install

CMD ["npm", "test"]
#docker ps
#docker run --rm -it --network recruiting-qa-challenge_default cypress_test
#docker build -t cypress_test .
#docker run --rm -it --network recruiting-qa-challenge_default -v $(pwd)/reports:/app/cypress/generate-reports cypress_test

#docker network ls
#docker network inspect recruiting-qa-challenge_default


