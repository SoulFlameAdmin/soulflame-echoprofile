-- V20 Test Data Seed

insert into profiles (
  id, name, contact, goal, age, main_trait, second_trait, profile, scores, mini_report, full_report, raw
) values (
  200000001,
  'Test Client',
  'test@example.com',
  'Бизнес посока',
  '25-34',
  'vision',
  'logic',
  'Визионерски Echo профил',
  '{"vision":10,"emotion":4,"logic":8,"social":3,"action":5}'::jsonb,
  'Mini test report',
  'Full test report',
  '{"source":"v20_test_seed"}'::jsonb
) on conflict (id) do nothing;

insert into unlock_codes (
  id, code, status, offer, note, raw
) values (
  200000002,
  'ECHO-TEST-V20',
  'unused',
  'Full AI Echo - 19.99 лв',
  'V20 test code',
  '{"source":"v20_test_seed"}'::jsonb
) on conflict (id) do nothing;
