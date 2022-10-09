BEGIN;
ALTER TABLE tags DROP CONSTRAINT tags_creator_fkey;
ALTER TABLE tags ALTER COLUMN creator DROP NOT NULL;
ALTER TABLE tags ADD CONSTRAINT tags_creator_fkey FOREIGN KEY (creator) REFERENCES users (uid) ON DELETE SET NULL;

ALTER TABLE userstags DROP CONSTRAINT userstags_taggeduser_fkey;
ALTER TABLE userstags ADD CONSTRAINT userstags_taggeduser_fkey FOREIGN KEY (taggeduser) REFERENCES users (uid) ON DELETE CASCADE;
COMMIT;