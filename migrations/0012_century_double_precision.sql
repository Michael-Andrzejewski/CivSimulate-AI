-- Day/week/month timescales advance the timeline by fractional years
-- (1 day = 1/365). The century columns were integers, so Postgres rejected
-- those updates — sub-year timescales only ever worked on local SQLite.
ALTER TABLE civilizations ALTER COLUMN "current_century" TYPE double precision;
ALTER TABLE civilizations ALTER COLUMN "player_b_current_century" TYPE double precision;
