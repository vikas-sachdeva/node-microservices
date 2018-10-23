#!/bin/sh

if [ $# -eq 0 ]; then
    printf "Run this script with ambassador URL"
    exit -1
fi

URL=$1

API_URL[0]="$URL/subscription/getAllItems"
API_URL[1]="$URL/payment/start/id1"
API_URL[2]="$URL/payment/stop/id1"

for i in "${API_URL[@]}"
do
	HTTP_CODE=$(curl -s -o /dev/null -H 'authorization:mysecret' -w "%{http_code}" $i)
	if [ "${HTTP_CODE}" -ne "200" ]; then
		printf "Something went wrong while calling $i API\n"
		exit 1
	else
		printf "Call to $i API returns 200 status code.\n"
	fi
done