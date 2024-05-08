CREATE TABLE IF NOT EXISTS users
(
    id       BIGINT GENERATED BY DEFAULT AS IDENTITY,
    email    VARCHAR(320) NOT NULL,
    password VARCHAR(40)  NOT NULL,
    CONSTRAINT UQ_USER_EMAIL UNIQUE (email)
)