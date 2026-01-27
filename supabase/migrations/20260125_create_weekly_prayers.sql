-- Create weekly_prayers table for Monday-Saturday prayers connected to Sunday themes
CREATE TABLE IF NOT EXISTS weekly_prayers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sunday_date DATE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 6), -- 1=Monday, 6=Saturday
  cycle TEXT NOT NULL CHECK (cycle IN ('A', 'B', 'C')),
  season TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(sunday_date, day_of_week, cycle)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_weekly_prayers_sunday_cycle ON weekly_prayers(sunday_date, cycle);
CREATE INDEX IF NOT EXISTS idx_weekly_prayers_day ON weekly_prayers(day_of_week);

-- Add comment
COMMENT ON TABLE weekly_prayers IS 'Weekly thematic prayers (Monday-Saturday) connected to Sunday themes';
