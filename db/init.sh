#!/bin/sh

db_name=$1

if [ ! -n "$db_name" ]; then
    echo "Database name required"
    exit
fi
# echo "Begin deleting database '$db_name'"
# dropdb -Upostgres --if-exists  $db_name
# echo "Database '$db_name' deleted\n"

# echo "Begin creating database '$db_name'"
# createdb -Upostgres $db_name
# echo "Database '$db_name' created\n"

echo "Begin seeding into '$db_name'"
psql -Upostgres -d$db_name <<OMG
BEGIN;

\i ./db/schema/transaction.sql

COMMIT;
OMG
echo "Query done"
