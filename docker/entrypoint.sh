#!/bin/bash

cat /directus/patchbay_db.sql | docker exec -i patchbay_postgis psql -U admin
nginx -g daemon off
