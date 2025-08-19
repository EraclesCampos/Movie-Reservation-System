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
    clasification VARCHAR(10),
    poster TEXT
);

CREATE TABLE rooms(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(10),
    capacity INT
);
CREATE TABLE showtimes(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_room INT NOT NULL,
    id_movie INT NULL,
    date_time DATETIME,
    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (id_movie) REFERENCES movies(id) ON DELETE RESTRICT
);
CREATE TABLE reservations(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_showtime INT NOT NULL,
    id_user INT NULL,
    date_reservation DATETIME,
    FOREIGN KEY (id_showtime) REFERENCES showtimes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE seats(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_room INT NOT NULL,
    row_id VARCHAR(10),
    number_seat INT,
    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE RESTRICT
);
CREATE TABLE reserved_seats(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_seat INT NOT NULL,
    id_room INT NOT NULL,
    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_seat) REFERENCES seats(id) ON DELETE RESTRICT
);