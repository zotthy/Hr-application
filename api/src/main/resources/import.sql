-- 1. DODAWANIE UŻYTKOWNIKÓW (REKRUTERÓW)
INSERT INTO users (name, email, password, roles) VALUES ('Jan Kowalski', 'jan.kowalski@firma.pl', 'pass123', 'RECRUITER');
INSERT INTO users (name, email, password, roles) VALUES ('Anna Nowak', 'anna.nowak@firma.pl', 'pass456', 'RECRUITER');
INSERT INTO users (name, email, password, roles) VALUES ('Marek Zieliński', 'marek.zielinski@firma.pl', 'pass789', 'RECRUITER');

-- 2. DODAWANIE OFERT PRACY (RECRUITMENTS)
-- Rekruter 1 (Jan)
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-001', 'Java Developer', 'Szukamy programisty Java do backendu.', 'OPEN', 1, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-002', 'SQL Specialist', 'Ekspert od baz danych PostgreSQL.', 'OPEN', 1, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-003', 'Project Manager', 'Zarządzanie projektami IT.', 'CLOSED', 1, NOW());

-- Rekruter 2 (Anna)
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-004', 'Frontend Developer', 'Praca z React i TypeScript.', 'OPEN', 2, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-005', 'UX Designer', 'Projektowanie interfejsów mobilnych.', 'OPEN', 2, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-006', 'QA Engineer', 'Testy automatyczne w Selenium.', 'OPEN', 2, NOW());

-- Rekruter 3 (Marek)
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-007', 'Cybersecurity Analyst', 'Analiza zagrożeń i testy penetracyjne.', 'OPEN', 3, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-008', 'Python Developer', 'Data Science i skrypty w Pythonie.', 'OPEN', 3, NOW());
INSERT INTO recruitments (recruitment_id_string, title, description, status, user_id, created_at) VALUES ('REC-2025-009', 'Linux Administrator', 'Zarządzanie serwerami Debian/Ubuntu.', 'OPEN', 3, NOW());

-- 3. DODAWANIE KANDYDATÓW (4 NA KAŻDĄ OFERTĘ)
-- Oferta 1 (Java Developer)
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, feature_education, feature_certifications, feature_job_role, feature_salary_expectation, feature_projects_count, skill_java, skill_sql, skill_react, model_score) VALUES ('Adam', 'Wiśniewski', 'adam.w@gmail.com', 'REC-2025-001', 'NEW', 1, 5, 1, 2, 1, 5, 10, 1, 1, 0, 0.85);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, feature_education, feature_certifications, feature_job_role, feature_salary_expectation, feature_projects_count, skill_java, skill_sql, skill_react, model_score) VALUES ('Beata', 'Kozak', 'beata.k@gmail.com', 'REC-2025-001', 'NEW', 1, 2, 0, 1, 0, 3, 4, 1, 0, 0, 0.62);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, feature_education, feature_certifications, feature_job_role, feature_salary_expectation, feature_projects_count, skill_java, skill_sql, skill_react, model_score) VALUES ('Cezary', 'Pazura', 'cezary.p@gmail.com', 'REC-2025-001', 'REJECTED', 1, 1, 0, 0, 0, 2, 1, 0, 1, 0, 0.30);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, feature_education, feature_certifications, feature_job_role, feature_salary_expectation, feature_projects_count, skill_java, skill_sql, skill_react, model_score) VALUES ('Dorota', 'Wellman', 'dorota.w@gmail.com', 'REC-2025-001', 'NEW', 1, 8, 1, 5, 1, 7, 15, 1, 1, 1, 0.98);

-- Oferta 2 (SQL Specialist)
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_sql, model_score) VALUES ('Ewa', 'Farna', 'ewa.f@test.pl', 'REC-2025-002', 'NEW', 2, 3, 1, 0.75);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_sql, model_score) VALUES ('Filip', 'Chajzer', 'filip.c@test.pl', 'REC-2025-002', 'NEW', 2, 1, 1, 0.45);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_sql, model_score) VALUES ('Grzegorz', 'Braun', 'grzegorz.b@test.pl', 'REC-2025-002', 'NEW', 2, 10, 1, 0.92);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_sql, model_score) VALUES ('Hanna', 'Lis', 'hanna.l@test.pl', 'REC-2025-002', 'NEW', 2, 4, 0, 0.50);

-- Oferta 4 (Frontend Developer)
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_react, model_score) VALUES ('Igor', 'Herbut', 'igor.h@test.pl', 'REC-2025-004', 'NEW', 4, 2, 1, 0.80);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_react, model_score) VALUES ('Justyna', 'Steczkowska', 'justyna.s@test.pl', 'REC-2025-004', 'NEW', 4, 5, 1, 0.88);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_react, model_score) VALUES ('Kamil', 'Bednarek', 'kamil.b@test.pl', 'REC-2025-004', 'NEW', 4, 1, 0, 0.40);
INSERT INTO candidate_applications (first_name, last_name, email, job_id, status, recruitment_id, feature_experience_years, skill_react, model_score) VALUES ('Laura', 'Samojłowicz', 'laura.s@test.pl', 'REC-2025-004', 'NEW', 4, 3, 1, 0.70);