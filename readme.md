Startup:
npm run serve

Note: need to run the mySQL.sql in your own local mySQL and also to change config inside knex-config.ts to point to the local mySQL instance

Example (CURL):
- curl --request POST \
    --url http://localhost:3000/api/register \
    --header 'content-type: application/json' \
    --data '{
    "teacher": "teacherA",
    "students": [
      "studentA",
      "studentB"
    ]
  }'
- curl --request POST \
    --url http://localhost:3000/api/register \
    --header 'content-type: application/json' \
    --data '{
    "teacher": "teacherB",
    "students": [
      "studentA",
      "studentC",
      "studentD"
    ]
  }'
- curl --request GET \
  --url 'http://localhost:3000/api/commonstudents?teacher=teacherA&teacher=teacherB' \
  --header 'content-type: application/json'
- curl --request POST \
    --url http://localhost:3000/api/suspend \
    --header 'content-type: application/json' \
    --data '{
    "student":"studentB"
  }'
- curl --request POST \
    --url http://localhost:3000/api/retrievefornotifications \
    --header 'content-type: application/json' \
    --data '{
    "teacher":"teacherA",
    "notification": "Hello! @studentC"
  }'
  - curl --request POST \
    --url http://localhost:3000/api/retrievefornotifications \
    --header 'content-type: application/json' \
    --data '{
    "teacher":"teacherB",
    "notification": "Hello! "
  }'

TODO:
- add a validation of inputs for api (JOI)
- add interfaces/models
- add unit tests
- add docs (swagger)
- improve raw to data conversion logic/process
- use a query filter. (if else loop to add where clause to SQL query)


