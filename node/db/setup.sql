CREATE DATABASE "project-collab-db";
CREATE USER "project-collab-admin" WITH ENCRYPTED PASSWORD 'collab-project';
GRANT ALL PRIVILEGES ON DATABASE "project-collab-db" TO "project-collab-admin";

CREATE DATABASE "project-collab-test-db";

CREATE user root;
GRANT ALL PRIVILEGES ON DATABASE "project-collab-test-db" TO "root";