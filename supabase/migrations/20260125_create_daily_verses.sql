-- Create daily_verses table for daily verse + brief reflection
CREATE TABLE IF NOT EXISTS daily_verses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  verse_reference TEXT NOT NULL,
  verse_text TEXT NOT NULL,
  reflection TEXT NOT NULL,
  theme TEXT, -- Optional: tema da semana
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_verses_date ON daily_verses(date);

-- Add comment
COMMENT ON TABLE daily_verses IS 'Daily verse with brief reflection (2-3 sentences)';
