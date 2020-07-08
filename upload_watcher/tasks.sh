#!/bin/bash

set -e
cd ${0%/*}

function usage() {
    echo "Usage: $0 [command]"
    echo
    echo "Task runner for uploading assets to an S3 bucket."
    echo
    echo "COMMANDS"
    echo
    echo "  help    Print this usage text"
    echo "  init    Creates the config for using s3cmd"
    echo "  sync    Syncs everything to S3"
    echo "  watch   Watches for file changes and updates S3"
    echo
}

case "$1" in
    init)
        envsubst < .s3cfg.template > /root/.s3cfg
        ;;

    sync)
        s3cmd sync --exclude=temporary-uploads /data/ s3://${S3_BUCKET}
        ;;

    watch)
        watcher debug -c watch_config.ini
        ;;

    "" | "help" | "-h" | "--help")
        usage
        ;;

    *)
        echo "ERROR: Unknown command '$1'"
        usage
        exit 1
        ;;
esac