BEGIN;
DROP TABLE IF EXISTS "user",
"like",
"post",
"message",
"favourite",
"advert",
"advert_has_image",
"tag";

CREATE TABLE "user" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  firstname VARCHAR(64) NOT NULL,
  lastname VARCHAR(64) NOT NULL,
  description VARCHAR(255),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  longitude TEXT NOT NULL,
  latitude TEXT NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "tag" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "advert" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(64) NOT NULL,
  content TEXT NOT NULL,
  price SMALLINT NOT NULL,
  user_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (tag_id) REFERENCES "tag"(id)
);
CREATE TABLE "advert_has_image" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  advert_id INTEGER NOT NULL,
  thumbnail TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (advert_id) REFERENCES "advert"("id")
);
CREATE TABLE "post" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content TEXT NOT NULL,
  thumbnail TEXT,
  reply_to INTEGER REFERENCES "post"("id"),
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);
CREATE TABLE "message" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content TEXT NOT NULL,
  expediteur INTEGER NOT NULL,
  destinataire INTEGER NOT NULL,
  conversation_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (expediteur) REFERENCES "user"(id),
  FOREIGN KEY (destinataire) REFERENCES "user"(id)
);
CREATE TABLE "favourite" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  advert_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (advert_id) REFERENCES "advert"(id),
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);
CREATE TABLE "like" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES "post"(id),
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);
  
  COMMIT ; 