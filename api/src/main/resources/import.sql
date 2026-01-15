-- 1. DODAWANIE UŻYTKOWNIKÓW (REKRUTERÓW)
INSERT INTO users (name, email, password, roles) VALUES ('Jan Kowalski', 'jan.kowalski@firma.pl', 'pass123', 'RECRUITER');
INSERT INTO users (name, email, password, roles) VALUES ('Anna Nowak', 'anna.nowak@firma.pl', 'pass456', 'RECRUITER');
INSERT INTO users (name, email, password, roles) VALUES ('Marek Zieliński', 'marek.zielinski@firma.pl', 'pass789', 'RECRUITER');

-- 2. DODAWANIE OFERT PRACY (RECRUITMENTS) Z NOWYMI POLAMI

-- Rekruter 1 (Jan)
INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) 
VALUES ('REC-2025-001', 'Java Developer', 'Szukamy programisty Java do backendu.', 'OPEN', 'Warszawa (Zdalnie)', 12000, 18000, 'PLN', 'B2B', 'Mid', 1, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) 
VALUES ('REC-2025-002', 'SQL Specialist', 'Ekspert od baz danych PostgreSQL.', 'OPEN', 'Kraków (Hybrydowo)', 10000, 15000, 'PLN', 'UoP', 'Senior', 1, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) 
VALUES ('REC-2025-003', 'Project Manager', 'Zarządzanie projektami IT.', 'CLOSED', 'Warszawa', 15000, 22000, 'PLN', 'B2B', 'Senior', 1, NOW());


-- Rekruter 2 (Anna)
INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-004', 'Frontend Developer', 'Praca z React i TypeScript.', 'OPEN', 'Wrocław (Zdalnie)', 9000, 14000, 'PLN', 'B2B', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at)VALUES ('REC-2025-005', 'UX Designer', 'Projektowanie interfejsów mobilnych.', 'OPEN', 'Poznań', 8000, 12000, 'PLN', 'UoP', 'Junior', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-006', 'QA Engineer', 'Testy automatyczne w Selenium.', 'OPEN', 'Gdańsk', 10000, 16000, 'PLN', 'B2B', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-007', 'Java Developer', 'Tworzenie mikroserwisów w Spring Boot.', 'OPEN', 'Warszawa', 15000, 22000, 'PLN', 'B2B', 'Senior', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-008', 'Python Developer', 'Analiza danych i skrypty automatyzujące.', 'OPEN', 'Kraków', 12000, 18000, 'PLN', 'B2B', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-009', 'DevOps Engineer', 'Zarządzanie infrastrukturą AWS i Docker.', 'OPEN', 'Warszawa (Zdalnie)', 18000, 25000, 'PLN', 'B2B', 'Senior', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-010', 'Data Scientist', 'Modelowanie ML i analiza statystyczna.', 'OPEN', 'Wrocław', 14000, 20000, 'PLN', 'UoP', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-011', 'Mobile App Developer', 'Rozwój aplikacji Flutter na iOS i Android.', 'OPEN', 'Łódź', 10000, 15000, 'PLN', 'B2B', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-012', 'System Architect', 'Projektowanie architektury rozproszonej.', 'OPEN', 'Kraków (Zdalnie)', 25000, 35000, 'PLN', 'B2B', 'Expert', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-013', 'Product Owner', 'Zarządzanie backlogiem i wizją produktu.', 'OPEN', 'Poznań', 12000, 17000, 'PLN', 'UoP', 'Senior', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-014', 'Security Analyst', 'Audyty bezpieczeństwa i testy penetracyjne.', 'OPEN', 'Gdańsk', 13000, 19000, 'PLN', 'UoP', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-015', 'Fullstack Developer', 'Praca w stacku Node.js i Angular.', 'OPEN', 'Lublin', 11000, 16000, 'PLN', 'B2B', 'Mid', 2, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-016', 'Helpdesk Support', 'Wsparcie techniczne pierwszego stopnia.', 'OPEN', 'Szczecin', 5000, 7500, 'PLN', 'UoP', 'Junior', 2, NOW());

-- Rekruter 3 (Marek)
INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-007', 'Cybersecurity Analyst', 'Analiza zagrożeń i testy penetracyjne.', 'OPEN', 'Zdalnie', 14000, 20000, 'PLN', 'B2B', 'Senior', 3, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-008', 'Python Developer', 'Data Science i skrypty w Pythonie.', 'OPEN', 'Łódź', 11000, 17000, 'PLN', 'UoP', 'Mid', 3, NOW());

INSERT INTO recruitments (recruitment_id_string, title, description, status, location, salary_min, salary_max, currency, contract_type, experience_level, user_id, created_at) VALUES ('REC-2025-009', 'Linux Administrator', 'Zarządzanie serwerami Debian/Ubuntu.', 'OPEN', 'Katowice', 9000, 13000, 'PLN', 'UoP', 'Mid', 3, NOW());
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