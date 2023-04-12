# my-homemade-preserves-express-backend
Backend for My Homemade Preserves app.

<!-- ABOUT THE PROJECT -->
## About The Project

My Homemade Preserves is an app that allows to track your preserves. I made it at the end of course to check my skills. You can find frontend for the app <a href="https://github.com/baradoslaw/my-homemade-preserves-frontend">here</a>.




### Built With

* React
* Express.js
* TypeScript



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/baradoslaw/my-homemade-preserves-express-backend.git
   ```
2. Create table in your database with given sql
```sh
   SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `preserve` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `session` (
  `sessionId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `type_of_preserve` (
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `type_of_preserve` (`name`) VALUES
('Dżem'),
('Inne'),
('Kandyzowane owoce'),
('Kiszonka'),
('Konserwa'),
('Marmolada'),
('Nalewka'),
('Piwo'),
('Sok'),
('Suszonka'),
('Wino');

CREATE TABLE `user` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pwd` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user` (`id`, `login`, `pwd`, `email`, `name`, `surname`) VALUES
('7bb6c73c-1706-48c2-aa54-92f1f11c9d75', 'janKowalski', '$2b$10$KODzJpZNLAoWH76do2s9f..HlvoAMAoUtXceckIrenMYZvAWUd5Ne', 'kowalski@mail.to', 'Jan', 'Kowalski');

ALTER TABLE `preserve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e64e1ab1776f380283dc2914cb9` (`typeName`),
  ADD KEY `FK_42e22bc55a56857b90b888d7d23` (`userId`);

ALTER TABLE `session`
  ADD PRIMARY KEY (`sessionId`) USING BTREE,
  ADD KEY `FK_session_user` (`userId`) USING BTREE;

ALTER TABLE `type_of_preserve`
  ADD PRIMARY KEY (`name`);


ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_a62473490b3e4578fd683235c5` (`login`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

ALTER TABLE `preserve`
  ADD CONSTRAINT `FK_42e22bc55a56857b90b888d7d23` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e64e1ab1776f380283dc2914cb9` FOREIGN KEY (`typeName`) REFERENCES `type_of_preserve` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `session`
  ADD CONSTRAINT `FK_session_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;
   ```
3. Add file with db connection (enter your own connection parameters), file should be placed in utils catalog, and should be named db.ts:
```sh
   import {createPool} from "mysql2/promise";

   export const pool = createPool({
     host: 'host_name',
     user: 'user_name',
     password: 'db_password',
     database: 'my_homemade_preserves',
     namedPlaceholders: true,
     decimalNumbers: true,
   });

  pool.execute("DELETE FROM `session`");
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Start the server development
```sh
   npm start
   ```



<!-- FEATURES -->
## FEATURES
- Log in and out
- Add and delete preserves

Planned features:
- Reminders for preserves
- Current state of preserve
- Changing name or description of preserve

