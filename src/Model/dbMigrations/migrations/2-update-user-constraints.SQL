ALTER TABLE Users
ADD CONSTRAINT unique_emails UNIQUE(email);
ALTER TABLE Users
ADD CONSTRAINT unique_nicknames UNIQUE(nickname);