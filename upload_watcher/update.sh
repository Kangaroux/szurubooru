#!/bin/bash

if [[ ! -f "$1" ]]; then
    # Remove the object.
    s3cmd rm s3://${S3_BUCKET}/$1
else
    # Create a public object.
    s3cmd put $1 s3://${S3_BUCKET}/${1#/data/} -P
fi
