DROP TABLE IF EXISTS overrides;
DROP TABLE IF EXISTS classifications;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS officer_programmes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS programmes;
DROP TABLE IF EXISTS users;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(30) NOT NULL UNIQUE,
  `email` varchar(40) NOT NULL UNIQUE,
  `password_hash` varchar(100) NOT NULL,
  `role` ENUM('admin','officer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programmes`
--

CREATE TABLE `programmes` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(100) NOT NULL,
  `code` varchar(15) NOT NULL,
  `award_type` varchar(50) NOT NULL,
  `academic_year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `officer_programmes`
--

CREATE TABLE `officer_programmes` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `officer_id` int(11) NOT NULL,
  `programme_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `programme_id` int(11) NOT NULL,
  `module_code` varchar(20) NOT NULL,
  `module_title` varchar(100) NOT NULL,
  `academic_level` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `is_core` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `student_no` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `programme_id` int(11) NOT NULL,
  `study_year` int(11) NOT NULL DEFAULT 3,
  `graduation_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `student_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `attempt_no` int(11) NOT NULL DEFAULT 1,
  `mark` decimal(5,2) NOT NULL,
  `is_resit` tinyint(1) NOT NULL,
  `capped_mark` decimal(5,2) NOT NULL,
  `passed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classifications`
--

CREATE TABLE `classifications` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `student_id` int(11) NOT NULL,
  `yr1_creds` int(11) NOT NULL DEFAULT 0,
  `yr2_creds` int(11) NOT NULL DEFAULT 0,
  `yr3_creds` int(11) NOT NULL DEFAULT 0,
  `yr2_avg` decimal(5,2) DEFAULT NULL,
  `yr3_avg` decimal(5,2) DEFAULT NULL,
  `final_avg` decimal(5,2) DEFAULT NULL,
  `proposed_class` varchar(50) DEFAULT NULL,
  `is_eligible` tinyint(1) NOT NULL,
  `eligibility_reason` varchar(200) DEFAULT NULL,
  `classified_at` datetime DEFAULT NULL,
  `classified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `overrides`
--

CREATE TABLE `overrides` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `classification_id` int(11) NOT NULL,
  `override_class` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `overriden_by` int(11) NOT NULL,
  `overriden_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- ========================================
-- SET AUTO-INCREMENT START VALUES
-- ========================================

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE programmes AUTO_INCREMENT = 100;
ALTER TABLE modules AUTO_INCREMENT = 200;
ALTER TABLE students AUTO_INCREMENT = 1000;
ALTER TABLE officer_programmes AUTO_INCREMENT = 2000;
ALTER TABLE results AUTO_INCREMENT = 3000;
ALTER TABLE classifications AUTO_INCREMENT = 4000;
ALTER TABLE overrides AUTO_INCREMENT = 5000;

-- --------------------------------------------------------

-- ========================================
-- USERS SAMPLE DATA
-- ========================================

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'admin'),
('officer1', 'officer1@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'officer'),
('officer2', 'officer2@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'officer');
-- --------------------------------------------------------

-- ========================================
-- PROGRAMMES SAMPLE DATA
-- ========================================
INSERT INTO programmes (title, code, award_type, academic_year) VALUES
('BSc Computer Science', 'BSC-CS', 'BSc', '2025/26'),
('BSc Software Engineering', 'BSC-SE', 'BSc', '2025/26');

-- --------------------------------------------------------

-- ========================================
-- OFFICER -> PROGRAMME ASSIGNMENTS SAMPLE DATA
-- ========================================
INSERT INTO officer_programmes (officer_id, programme_id) VALUES
(2, 100),
(3, 101);


-- ========================================
-- MODULES SAMPLE DATA
-- 3 years x 6 modules x 20 credits = 120 credits per year
-- ========================================

-- BSc Computer Science
INSERT INTO modules (programme_id, module_code, module_title, academic_level, credits, is_core) VALUES
-- Year 1
(100, 'CSC101', 'Programming Fundamentals', 1, 20, 1),
(100, 'CSC102', 'Web Design Basics', 1, 20, 1),
(100, 'CSC103', 'Computer Systems', 1, 20, 1),
(100, 'CSC104', 'Database Fundamentals', 1, 20, 1),
(100, 'CSC105', 'Mathematics for Computing', 1, 20, 1),
(100, 'CSC106', 'Professional Skills', 1, 20, 1),

-- Year 2
(100, 'CSC201', 'Object Oriented Programming', 2, 20, 1),
(100, 'CSC202', 'Web Application Development', 2, 20, 1),
(100, 'CSC203', 'Data Structures', 2, 20, 1),
(100, 'CSC204', 'Database Systems', 2, 20, 1),
(100, 'CSC205', 'Networks', 2, 20, 1),
(100, 'CSC206', 'Software Engineering', 2, 20, 1),

-- Year 3
(100, 'CSC301', 'Final Year Project', 3, 20, 1),
(100, 'CSC302', 'Advanced Web Development', 3, 20, 1),
(100, 'CSC303', 'Artificial Intelligence', 3, 20, 1),
(100, 'CSC304', 'Cyber Security', 3, 20, 1),
(100, 'CSC305', 'Cloud Computing', 3, 20, 1),
(100, 'CSC306', 'Mobile Development', 3, 20, 1);

-- BSc Software Engineering
INSERT INTO modules (programme_id, module_code, module_title, academic_level, credits, is_core) VALUES
-- Year 1
(101, 'SWE101', 'Intro to Software Engineering', 1, 20, 1),
(101, 'SWE102', 'Programming 1', 1, 20, 1),
(101, 'SWE103', 'Systems Analysis', 1, 20, 1),
(101, 'SWE104', 'Databases', 1, 20, 1),
(101, 'SWE105', 'Teamworking', 1, 20, 1),
(101, 'SWE106', 'Mathematics', 1, 20, 1),

-- Year 2
(101, 'SWE201', 'Programming 2', 2, 20, 1),
(101, 'SWE202', 'Requirements Engineering', 2, 20, 1),
(101, 'SWE203', 'Software Design', 2, 20, 1),
(101, 'SWE204', 'Testing', 2, 20, 1),
(101, 'SWE205', 'Human Computer Interaction', 2, 20, 1),
(101, 'SWE206', 'Agile Development', 2, 20, 1),

-- Year 3
(101, 'SWE301', 'Dissertation', 3, 20, 1),
(101, 'SWE302', 'DevOps', 3, 20, 1),
(101, 'SWE303', 'Enterprise Development', 3, 20, 1),
(101, 'SWE304', 'Secure Systems', 3, 20, 1),
(101, 'SWE305', 'Software Quality', 3, 20, 1),
(101, 'SWE306', 'Project Management', 3, 20, 1);
-- --------------------------------------------------------
-- ========================================
-- STUDENTS SAMPLE DATA
-- ========================================
INSERT INTO students (student_no, first_name, last_name, email, programme_id, study_year, graduation_year) VALUES
(40365001, 'Emma', 'Wilson', 'emma.wilson@uni.ac.uk', 100, 3, 2026),
(40365002, 'Jack', 'Murphy', 'jack.murphy@uni.ac.uk', 100, 3, 2026),
(40365003, 'Aisha', 'Khan', 'aisha.khan@uni.ac.uk', 100, 3, 2026),
(40365004, 'Liam', 'Brown', 'liam.brown@uni.ac.uk', 100, 3, 2026),
(40365005, 'Sophie', 'Doyle', 'sophie.doyle@uni.ac.uk', 101, 3, 2026),
(40365006, 'Noah', 'Kelly', 'noah.kelly@uni.ac.uk', 101, 3, 2026),
(40365007, 'Hannah', 'Ali', 'hannah.ali@uni.ac.uk', 101, 3, 2026),
(40365008, 'Daniel', 'Evans', 'daniel.evans@uni.ac.uk', 101, 3, 2026);

-- ========================================
-- RESULTS SAMPLE DATA
-- Student 1: strong First
-- ========================================
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1000, 200, 1, 65, 0, 65, 1),
(1000, 201, 1, 68, 0, 68, 1),
(1000, 202, 1, 62, 0, 62, 1),
(1000, 203, 1, 66, 0, 66, 1),
(1000, 204, 1, 64, 0, 64, 1),
(1000, 205, 1, 67, 0, 67, 1),
(1000, 206, 1, 69, 0, 69, 1),
(1000, 207, 1, 72, 0, 72, 1),
(1000, 208, 1, 70, 0, 70, 1),
(1000, 209, 1, 68, 0, 68, 1),
(1000, 210, 1, 71, 0, 71, 1),
(1000, 211, 1, 69, 0, 69, 1),
(1000, 212, 1, 74, 0, 74, 1),
(1000, 213, 1, 76, 0, 76, 1),
(1000, 214, 1, 71, 0, 71, 1),
(1000, 215, 1, 73, 0, 73, 1),
(1000, 216, 1, 75, 0, 75, 1),
(1000, 217, 1, 72, 0, 72, 1);

-- Student 2: solid 2:1
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1001, 200, 1, 55, 0, 55, 1),
(1001, 201, 1, 58, 0, 58, 1),
(1001, 202, 1, 54, 0, 54, 1),
(1001, 203, 1, 57, 0, 57, 1),
(1001, 204, 1, 56, 0, 56, 1),
(1001, 205, 1, 59, 0, 59, 1),
(1001, 206, 1, 60, 0, 60, 1),
(1001, 207, 1, 62, 0, 62, 1),
(1001, 208, 1, 59, 0, 59, 1),
(1001, 209, 1, 61, 0, 61, 1),
(1001, 210, 1, 63, 0, 63, 1),
(1001, 211, 1, 60, 0, 60, 1),
(1001, 212, 1, 64, 0, 64, 1),
(1001, 213, 1, 66, 0, 66, 1),
(1001, 214, 1, 62, 0, 62, 1),
(1001, 215, 1, 65, 0, 65, 1),
(1001, 216, 1, 63, 0, 63, 1),
(1001, 217, 1, 64, 0, 64, 1);

-- Student 3: lower 2:2
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1002, 200, 1, 50, 0, 50, 1),
(1002, 201, 1, 48, 0, 48, 1),
(1002, 202, 1, 52, 0, 52, 1),
(1002, 203, 1, 49, 0, 49, 1),
(1002, 204, 1, 51, 0, 51, 1),
(1002, 205, 1, 47, 0, 47, 1),
(1002, 206, 1, 53, 0, 53, 1),
(1002, 207, 1, 55, 0, 55, 1),
(1002, 208, 1, 51, 0, 51, 1),
(1002, 209, 1, 54, 0, 54, 1),
(1002, 210, 1, 52, 0, 52, 1),
(1002, 211, 1, 50, 0, 50, 1),
(1002, 212, 1, 56, 0, 56, 1),
(1002, 213, 1, 54, 0, 54, 1),
(1002, 214, 1, 53, 0, 53, 1),
(1002, 215, 1, 55, 0, 55, 1),
(1002, 216, 1, 52, 0, 52, 1),
(1002, 217, 1, 54, 0, 54, 1);

-- Student 4: eligible but includes resit capped at 40
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1003, 200, 1, 45, 0, 45, 1),
(1003, 201, 1, 44, 0, 44, 1),
(1003, 202, 1, 42, 0, 42, 1),
(1003, 203, 1, 41, 0, 41, 1),
(1003, 204, 1, 46, 0, 46, 1),
(1003, 205, 1, 43, 0, 43, 1),
(1003, 206, 1, 38, 0, 38, 0),
(1003, 206, 2, 52, 1, 40, 1),
(1003, 207, 1, 43, 0, 43, 1),
(1003, 208, 1, 47, 0, 47, 1),
(1003, 209, 1, 45, 0, 45, 1),
(1003, 210, 1, 44, 0, 44, 1),
(1003, 211, 1, 46, 0, 46, 1),
(1003, 212, 1, 48, 0, 48, 1),
(1003, 213, 1, 46, 0, 46, 1),
(1003, 214, 1, 43, 0, 43, 1),
(1003, 215, 1, 45, 0, 45, 1),
(1003, 216, 1, 47, 0, 47, 1),
(1003, 217, 1, 44, 0, 44, 1);

-- Student 5: Software Engineering strong 2:1
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1004, 218, 1, 60, 0, 60, 1),
(1004, 219, 1, 63, 0, 63, 1),
(1004, 220, 1, 58, 0, 58, 1),
(1004, 221, 1, 61, 0, 61, 1),
(1004, 222, 1, 62, 0, 62, 1),
(1004, 223, 1, 59, 0, 59, 1),
(1004, 224, 1, 64, 0, 64, 1),
(1004, 225, 1, 65, 0, 65, 1),
(1004, 226, 1, 62, 0, 62, 1),
(1004, 227, 1, 63, 0, 63, 1),
(1004, 228, 1, 61, 0, 61, 1),
(1004, 229, 1, 64, 0, 64, 1),
(1004, 230, 1, 66, 0, 66, 1),
(1004, 231, 1, 68, 0, 68, 1),
(1004, 232, 1, 64, 0, 64, 1),
(1004, 233, 1, 65, 0, 65, 1),
(1004, 234, 1, 67, 0, 67, 1),
(1004, 235, 1, 66, 0, 66, 1);

-- Student 6: borderline Third / pass
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1005, 218, 1, 43, 0, 43, 1),
(1005, 219, 1, 45, 0, 45, 1),
(1005, 220, 1, 40, 0, 40, 1),
(1005, 221, 1, 42, 0, 42, 1),
(1005, 222, 1, 44, 0, 44, 1),
(1005, 223, 1, 41, 0, 41, 1),
(1005, 224, 1, 46, 0, 46, 1),
(1005, 225, 1, 44, 0, 44, 1),
(1005, 226, 1, 43, 0, 43, 1),
(1005, 227, 1, 45, 0, 45, 1),
(1005, 228, 1, 42, 0, 42, 1),
(1005, 229, 1, 44, 0, 44, 1),
(1005, 230, 1, 47, 0, 47, 1),
(1005, 231, 1, 45, 0, 45, 1),
(1005, 232, 1, 44, 0, 44, 1),
(1005, 233, 1, 46, 0, 46, 1),
(1005, 234, 1, 43, 0, 43, 1),
(1005, 235, 1, 45, 0, 45, 1);

-- Student 7: not eligible due to outstanding fail in Year 3
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1006, 218, 1, 52, 0, 52, 1),
(1006, 219, 1, 55, 0, 55, 1),
(1006, 220, 1, 51, 0, 51, 1),
(1006, 221, 1, 53, 0, 53, 1),
(1006, 222, 1, 50, 0, 50, 1),
(1006, 223, 1, 54, 0, 54, 1),
(1006, 224, 1, 56, 0, 56, 1),
(1006, 225, 1, 58, 0, 58, 1),
(1006, 226, 1, 55, 0, 55, 1),
(1006, 227, 1, 57, 0, 57, 1),
(1006, 228, 1, 54, 0, 54, 1),
(1006, 229, 1, 56, 0, 56, 1),
(1006, 230, 1, 60, 0, 60, 1),
(1006, 231, 1, 62, 0, 62, 1),
(1006, 232, 1, 35, 0, 35, 0),
(1006, 233, 1, 59, 0, 59, 1),
(1006, 234, 1, 61, 0, 61, 1),
(1006, 235, 1, 58, 0, 58, 1);

-- Student 8: strong First with one capped resit
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1007, 218, 1, 66, 0, 66, 1),
(1007, 219, 1, 68, 0, 68, 1),
(1007, 220, 1, 64, 0, 64, 1),
(1007, 221, 1, 67, 0, 67, 1),
(1007, 222, 1, 65, 0, 65, 1),
(1007, 223, 1, 66, 0, 66, 1),
(1007, 224, 1, 39, 0, 39, 0),
(1007, 224, 2, 58, 1, 40, 1),
(1007, 225, 1, 72, 0, 72, 1),
(1007, 226, 1, 69, 0, 69, 1),
(1007, 227, 1, 71, 0, 71, 1),
(1007, 228, 1, 70, 0, 70, 1),
(1007, 229, 1, 68, 0, 68, 1),
(1007, 230, 1, 74, 0, 74, 1),
(1007, 231, 1, 75, 0, 75, 1),
(1007, 232, 1, 73, 0, 73, 1),
(1007, 233, 1, 71, 0, 71, 1),
(1007, 234, 1, 72, 0, 72, 1),
(1007, 235, 1, 74, 0, 74, 1);

-- --------------------------------------------------------

--
-- Indexes for table `classifications`
--
ALTER TABLE `classifications`
  ADD KEY `classified_by` (`classified_by`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD KEY `programme_id` (`programme_id`);

--
-- Indexes for table `officer_programmes`
--
ALTER TABLE `officer_programmes`
  ADD KEY `officer_id` (`officer_id`),
  ADD KEY `programme_id` (`programme_id`);

--
-- Indexes for table `overrides`
--
ALTER TABLE `overrides`
  ADD KEY `classification_id` (`classification_id`),
  ADD KEY `overriden_by` (`overriden_by`);

--
-- Indexes for table `programmes`
--
ALTER TABLE `programmes`
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD UNIQUE KEY `student_no` (`student_no`),
  ADD KEY `programme_id` (`programme_id`);


--
-- Constraints for table `classifications`
--
ALTER TABLE `classifications`
  ADD CONSTRAINT `unique_student_classification` UNIQUE (`student_id`),
  ADD CONSTRAINT `classified_by` FOREIGN KEY (`classified_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_programme_id` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);

--
-- Constraints for table `officer_programmes`
--
ALTER TABLE `officer_programmes`
  ADD CONSTRAINT `officer_programmes_officer_id` FOREIGN KEY (`officer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `officer_programmes_programme_id` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);

--
-- Constraints for table `overrides`
--
ALTER TABLE `overrides`
  ADD CONSTRAINT `overrides_classification_id` FOREIGN KEY (`classification_id`) REFERENCES `classifications` (`id`),
  ADD CONSTRAINT `overridden_by` FOREIGN KEY (`overriden_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `results_modules_id` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_programme_id` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);
COMMIT;
