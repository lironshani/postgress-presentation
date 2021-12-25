CREATE DATABASE todolist;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
    checked BOOLEAN
);

CREATE DATABASE carstreatments;

CREATE TABLE treatments (
    treatment_number SERIAL PRIMARY KEY,
    treatment_information VARCHAR(255),
    date VARCHAR(255),
    worker_email VARCHAR(255),
    car_number INTEGER
);