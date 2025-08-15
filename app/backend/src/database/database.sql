-- Active: 1752613142348@@localhost@3306@movie_reservation_system
CREATE DATABASE movie_reservation_system;
USE movie_reservation_system;
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL
);
CREATE TABLE movies(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    duration INT,
    clasification VARCHAR(10)
);

CREATE TABLE rooms(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(10),
    capacity INT
);
CREATE TABLE functions(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_room INT NOT NULL,
    id_movie INT NOT NULL,
    date_time DATETIME,
    FOREIGN KEY (id_room) REFERENCES rooms(id),
    FOREIGN KEY (id_movie) REFERENCES movies(id)
);
CREATE TABLE reservations(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_function INT NOT NULL,
    id_user INT NOT NULL,
    date_reservation DATETIME,
    FOREIGN KEY (id_function) REFERENCES functions(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
);
CREATE TABLE seats(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_room INT NOT NULL,
    row_id VARCHAR(10),
    number_seat INT,
    FOREIGN KEY (id_room) REFERENCES rooms(id)
);
CREATE TABLE reserved_seats(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_seat INT NOT NULL,
    id_room INT NOT NULL,
    FOREIGN KEY (id_room) REFERENCES rooms(id),
    FOREIGN KEY (id_seat) REFERENCES seats(id)
);