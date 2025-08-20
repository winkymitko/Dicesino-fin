/*
  # Create Bug Reports Table

  1. New Tables
    - `bug_reports`
      - `id` (text, primary key)
      - `user_id` (text, optional foreign key to users)
      - `user_email` (text, for contact)
      - `subject` (text, required)
      - `description` (text, required)
      - `status` (text, default 'open')
      - `priority` (text, default 'medium')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bug_reports` table
    - Add policies for authenticated users to create reports
    - Add policies for admins to read/update all reports
*/

CREATE TABLE IF NOT EXISTS bug_reports (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  user_email TEXT,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT bug_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- Policy for users to create bug reports
CREATE POLICY "Users can create bug reports"
  ON bug_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for users to read their own bug reports
CREATE POLICY "Users can read own bug reports"
  ON bug_reports
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy for admins to read all bug reports
CREATE POLICY "Admins can read all bug reports"
  ON bug_reports
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Policy for admins to update bug reports
CREATE POLICY "Admins can update bug reports"
  ON bug_reports
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );