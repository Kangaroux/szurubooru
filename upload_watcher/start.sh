#!/bin/bash

if [[ ! -f "/root/.s3cfg" ]]; then
    envsubst < .s3cfg.template > /root/.s3cfg
fi

watcher debug -c watch_config.ini