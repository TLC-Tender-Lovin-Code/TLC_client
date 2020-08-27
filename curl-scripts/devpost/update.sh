#!/bin/bash

API="http://localhost:4741"

URL_PATH="/update-post"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "devpost": {
      "title": "'"${TITLE}"'",
      "subject": "'"${SUBJECT}"'",
      "content": "'"${CONTENT}"'"
    }
  }'

echo
