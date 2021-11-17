# Installs dependencies
FROM node:12-alpine as dependencies
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock .yarn .yarnrc.yml ./
COPY .yarn/ ./.yarn
RUN yarn
# we copy after installing npm dependencies so that the previous steps are cached
COPY . ./

# Builds app
FROM dependencies as build
RUN yarn build

# Production environment
FROM nginxinc/nginx-unprivileged:1.19.6-alpine  as prod
## copy built files
COPY --from=build /app/build /usr/share/nginx/html
## copy nginx template config
COPY nginx/default.conf.template /
## copy startup script
COPY nginx/startup.sh /
EXPOSE 8080
## execute nginx
ENTRYPOINT [ "/startup.sh" ]

# Runs Unit Tests
FROM dependencies as unit-tests
ENV NODE_ENV test
RUN yarn test-ci

# Runs Sonar Scanner
FROM sonarsource/sonar-scanner-cli as sonar-scanner-analysis
WORKDIR /app
COPY --from=unit-tests /app /app
USER root
ARG BRANCH_NAME
RUN sonar-scanner \
  -X \
  -Dsonar.projectKey=devcloud-c7668ddb-7c83-4500-8151-8f9e73ccf26f-my-app \
  -Dsonar.branch.name=$BRANCH_NAME \
  -Dsonar.sources=./src \
  -Dsonar.exclusions=**/__tests__/** \
  -Dsonar.test.inclusions=**/*.test.tsx,**/*.test.ts \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.testExecutionReportPaths=reports/test-report.xml \
  -Dsonar.host.url=https://sonarqube.sehlat.io \
  -Dsonar.login=my-login