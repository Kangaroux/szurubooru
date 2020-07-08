FROM python:3.8

WORKDIR /app

# Needed for envsubst
RUN apt update && apt install -y gettext-base

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ./tasks.sh init && ./tasks.sh watch