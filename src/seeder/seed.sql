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

-- ========================================
-- USERS SAMPLE DATA
-- ========================================

INSERT INTO users (id, username, email, password_hash, role) VALUES
(1, 'admin', 'admin@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'admin'),
(2, 'officer1', 'officer1@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'officer'),
(3, 'officer2', 'officer2@hedclass.com', '$2b$10$OcKfLcBhWkveS2hmMIZUuetN8SP6VpBG4LfoXUEOK.c097Fbu.C3e', 'officer');
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
-- ========================================
-- PROGRAMMES SAMPLE DATA
-- ========================================
INSERT INTO programmes (id, title, code, award_type, academic_year) VALUES
(1, 'BSc Computer Science', 'BSC-CS', 'BSc', '2025/26'),
(2, 'BSc Software Engineering', 'BSC-SE', 'BSc', '2025/26');


-- --------------------------------------------------------

--
-- Table structure for table `officer_programmes`
--

CREATE TABLE `officer_programmes` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `officer_id` int(11) NOT NULL,
  `programme_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- ========================================
-- OFFICER -> PROGRAMME ASSIGNMENTS SAMPLE DATA
-- ========================================
INSERT INTO officer_programmes (id, officer_id, programme_id) VALUES
(1, 2, 1),
(2, 3, 2);

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


-- ========================================
-- MODULES SAMPLE DATA
-- 3 years x 6 modules x 20 credits = 120 credits per year
-- ========================================

-- BSc Computer Science
INSERT INTO modules (id, programme_id, module_code, module_title, academic_level, credits, is_core) VALUES
-- Year 1
(1, 1, 'CSC101', 'Programming Fundamentals', 1, 20, 1),
(2, 1, 'CSC102', 'Web Design Basics', 1, 20, 1),
(3, 1, 'CSC103', 'Computer Systems', 1, 20, 1),
(4, 1, 'CSC104', 'Database Fundamentals', 1, 20, 1),
(5, 1, 'CSC105', 'Mathematics for Computing', 1, 20, 1),
(6, 1, 'CSC106', 'Professional Skills', 1, 20, 1),

-- Year 2
(7, 1, 'CSC201', 'Object Oriented Programming', 2, 20, 1),
(8, 1, 'CSC202', 'Web Application Development', 2, 20, 1),
(9, 1, 'CSC203', 'Data Structures', 2, 20, 1),
(10, 1, 'CSC204', 'Database Systems', 2, 20, 1),
(11, 1, 'CSC205', 'Networks', 2, 20, 1),
(12, 1, 'CSC206', 'Software Engineering', 2, 20, 1),

-- Year 3
(13, 1, 'CSC301', 'Final Year Project', 3, 20, 1),
(14, 1, 'CSC302', 'Advanced Web Development', 3, 20, 1),
(15, 1, 'CSC303', 'Artificial Intelligence', 3, 20, 1),
(16, 1, 'CSC304', 'Cyber Security', 3, 20, 1),
(17, 1, 'CSC305', 'Cloud Computing', 3, 20, 1),
(18, 1, 'CSC306', 'Mobile Development', 3, 20, 1);

-- BSc Software Engineering
INSERT INTO modules (id, programme_id, module_code, module_title, academic_level, credits, is_core) VALUES
-- Year 1
(19, 2, 'SWE101', 'Intro to Software Engineering', 1, 20, 1),
(20, 2, 'SWE102', 'Programming 1', 1, 20, 1),
(21, 2, 'SWE103', 'Systems Analysis', 1, 20, 1),
(22, 2, 'SWE104', 'Databases', 1, 20, 1),
(23, 2, 'SWE105', 'Teamworking', 1, 20, 1),
(24, 2, 'SWE106', 'Mathematics', 1, 20, 1),

-- Year 2
(25, 2, 'SWE201', 'Programming 2', 2, 20, 1),
(26, 2, 'SWE202', 'Requirements Engineering', 2, 20, 1),
(27, 2, 'SWE203', 'Software Design', 2, 20, 1),
(28, 2, 'SWE204', 'Testing', 2, 20, 1),
(29, 2, 'SWE205', 'Human Computer Interaction', 2, 20, 1),
(30, 2, 'SWE206', 'Agile Development', 2, 20, 1),

-- Year 3
(31, 2, 'SWE301', 'Dissertation', 3, 20, 1),
(32, 2, 'SWE302', 'DevOps', 3, 20, 1),
(33, 2, 'SWE303', 'Enterprise Development', 3, 20, 1),
(34, 2, 'SWE304', 'Secure Systems', 3, 20, 1),
(35, 2, 'SWE305', 'Software Quality', 3, 20, 1),
(36, 2, 'SWE306', 'Project Management', 3, 20, 1);

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

-- ========================================
-- STUDENTS SAMPLE DATA
-- ========================================
INSERT INTO students (id, student_no, first_name, last_name, email, programme_id, study_year, graduation_year) VALUES
(1, 40365001, 'Emma', 'Wilson', 'emma.wilson@uni.ac.uk', 1, 3, 2026),
(2, 40365002, 'Jack', 'Murphy', 'jack.murphy@uni.ac.uk', 1, 3, 2026),
(3, 40365003, 'Aisha', 'Khan', 'aisha.khan@uni.ac.uk', 1, 3, 2026),
(4, 40365004, 'Liam', 'Brown', 'liam.brown@uni.ac.uk', 1, 3, 2026),
(5, 40365005, 'Sophie', 'Doyle', 'sophie.doyle@uni.ac.uk', 2, 3, 2026),
(6, 40365006, 'Noah', 'Kelly', 'noah.kelly@uni.ac.uk', 2, 3, 2026),
(7, 40365007, 'Hannah', 'Ali', 'hannah.ali@uni.ac.uk', 2, 3, 2026),
(8, 40365008, 'Daniel', 'Evans', 'daniel.evans@uni.ac.uk', 2, 3, 2026);


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
-- ========================================
-- RESULTS SAMPLE DATA
-- Student 1: strong First
-- ========================================
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(1, 1, 1, 65, 0, 65, 1),
(1, 2, 1, 68, 0, 68, 1),
(1, 3, 1, 62, 0, 62, 1),
(1, 4, 1, 66, 0, 66, 1),
(1, 5, 1, 64, 0, 64, 1),
(1, 6, 1, 67, 0, 67, 1),
(1, 7, 1, 69, 0, 69, 1),
(1, 8, 1, 72, 0, 72, 1),
(1, 9, 1, 70, 0, 70, 1),
(1, 10, 1, 68, 0, 68, 1),
(1, 11, 1, 71, 0, 71, 1),
(1, 12, 1, 69, 0, 69, 1),
(1, 13, 1, 74, 0, 74, 1),
(1, 14, 1, 76, 0, 76, 1),
(1, 15, 1, 71, 0, 71, 1),
(1, 16, 1, 73, 0, 73, 1),
(1, 17, 1, 75, 0, 75, 1),
(1, 18, 1, 72, 0, 72, 1);

-- Student 2: solid 2:1
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(2, 1, 1, 55, 0, 55, 1),
(2, 2, 1, 58, 0, 58, 1),
(2, 3, 1, 54, 0, 54, 1),
(2, 4, 1, 57, 0, 57, 1),
(2, 5, 1, 56, 0, 56, 1),
(2, 6, 1, 59, 0, 59, 1),
(2, 7, 1, 60, 0, 60, 1),
(2, 8, 1, 62, 0, 62, 1),
(2, 9, 1, 59, 0, 59, 1),
(2, 10, 1, 61, 0, 61, 1),
(2, 11, 1, 63, 0, 63, 1),
(2, 12, 1, 60, 0, 60, 1),
(2, 13, 1, 64, 0, 64, 1),
(2, 14, 1, 66, 0, 66, 1),
(2, 15, 1, 62, 0, 62, 1),
(2, 16, 1, 65, 0, 65, 1),
(2, 17, 1, 63, 0, 63, 1),
(2, 18, 1, 64, 0, 64, 1);

-- Student 3: lower 2:2
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(3, 1, 1, 50, 0, 50, 1),
(3, 2, 1, 48, 0, 48, 1),
(3, 3, 1, 52, 0, 52, 1),
(3, 4, 1, 49, 0, 49, 1),
(3, 5, 1, 51, 0, 51, 1),
(3, 6, 1, 47, 0, 47, 1),
(3, 7, 1, 53, 0, 53, 1),
(3, 8, 1, 55, 0, 55, 1),
(3, 9, 1, 51, 0, 51, 1),
(3, 10, 1, 54, 0, 54, 1),
(3, 11, 1, 52, 0, 52, 1),
(3, 12, 1, 50, 0, 50, 1),
(3, 13, 1, 56, 0, 56, 1),
(3, 14, 1, 54, 0, 54, 1),
(3, 15, 1, 53, 0, 53, 1),
(3, 16, 1, 55, 0, 55, 1),
(3, 17, 1, 52, 0, 52, 1),
(3, 18, 1, 54, 0, 54, 1);

-- Student 4: eligible but includes resit capped at 40
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(4, 1, 1, 45, 0, 45, 1),
(4, 2, 1, 44, 0, 44, 1),
(4, 3, 1, 42, 0, 42, 1),
(4, 4, 1, 41, 0, 41, 1),
(4, 5, 1, 46, 0, 46, 1),
(4, 6, 1, 43, 0, 43, 1),
(4, 7, 1, 38, 0, 38, 0),
(4, 8, 2, 52, 1, 40, 1),
(4, 9, 1, 47, 0, 47, 1),
(4, 10, 1, 45, 0, 45, 1),
(4, 11, 1, 44, 0, 44, 1),
(4, 12, 1, 46, 0, 46, 1),
(4, 13, 1, 48, 0, 48, 1),
(4, 14, 1, 46, 0, 46, 1),
(4, 15, 1, 43, 0, 43, 1),
(4, 16, 1, 45, 0, 45, 1),
(4, 17, 1, 47, 0, 47, 1),
(4, 18, 1, 44, 0, 44, 1);

-- Student 5: Software Engineering strong 2:1
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(5, 19, 1, 60, 0, 60, 1),
(5, 20, 1, 63, 0, 63, 1),
(5, 21, 1, 58, 0, 58, 1),
(5, 22, 1, 61, 0, 61, 1),
(5, 23, 1, 62, 0, 62, 1),
(5, 24, 1, 59, 0, 59, 1),
(5, 25, 1, 64, 0, 64, 1),
(5, 26, 1, 65, 0, 65, 1),
(5, 27, 1, 62, 0, 62, 1),
(5, 28, 1, 63, 0, 63, 1),
(5, 29, 1, 61, 0, 61, 1),
(5, 30, 1, 64, 0, 64, 1),
(5, 31, 1, 66, 0, 66, 1),
(5, 32, 1, 68, 0, 68, 1),
(5, 33, 1, 64, 0, 64, 1),
(5, 34, 1, 65, 0, 65, 1),
(5, 35, 1, 67, 0, 67, 1),
(5, 36, 1, 66, 0, 66, 1);

-- Student 6: borderline Third / pass
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(6, 19, 1, 43, 0, 43, 1),
(6, 20, 1, 45, 0, 45, 1),
(6, 21, 1, 40, 0, 40, 1),
(6, 22, 1, 42, 0, 42, 1),
(6, 23, 1, 44, 0, 44, 1),
(6, 24, 1, 41, 0, 41, 1),
(6, 25, 1, 46, 0, 46, 1),
(6, 26, 1, 44, 0, 44, 1),
(6, 27, 1, 43, 0, 43, 1),
(6, 28, 1, 45, 0, 45, 1),
(6, 29, 1, 42, 0, 42, 1),
(6, 30, 1, 44, 0, 44, 1),
(6, 31, 1, 47, 0, 47, 1),
(6, 32, 1, 45, 0, 45, 1),
(6, 33, 1, 44, 0, 44, 1),
(6, 34, 1, 46, 0, 46, 1),
(6, 35, 1, 43, 0, 43, 1),
(6, 36, 1, 45, 0, 45, 1);

-- Student 7: not eligible due to outstanding fail in Year 3
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(7, 19, 1, 52, 0, 52, 1),
(7, 20, 1, 55, 0, 55, 1),
(7, 21, 1, 51, 0, 51, 1),
(7, 22, 1, 53, 0, 53, 1),
(7, 23, 1, 50, 0, 50, 1),
(7, 24, 1, 54, 0, 54, 1),
(7, 25, 1, 56, 0, 56, 1),
(7, 26, 1, 58, 0, 58, 1),
(7, 27, 1, 55, 0, 55, 1),
(7, 28, 1, 57, 0, 57, 1),
(7, 29, 1, 54, 0, 54, 1),
(7, 30, 1, 56, 0, 56, 1),
(7, 31, 1, 60, 0, 60, 1),
(7, 32, 1, 62, 0, 62, 1),
(7, 33, 1, 35, 0, 35, 0),
(7, 34, 1, 59, 0, 59, 1),
(7, 35, 1, 61, 0, 61, 1),
(7, 36, 1, 58, 0, 58, 1);

-- Student 8: strong First with one capped resit
INSERT INTO results (student_id, module_id, attempt_no, mark, is_resit, capped_mark, passed) VALUES
(8, 19, 1, 66, 0, 66, 1),
(8, 20, 1, 68, 0, 68, 1),
(8, 21, 1, 64, 0, 64, 1),
(8, 22, 1, 67, 0, 67, 1),
(8, 23, 1, 65, 0, 65, 1),
(8, 24, 1, 66, 0, 66, 1),
(8, 25, 1, 39, 0, 39, 0),
(8, 25, 2, 58, 1, 40, 1),
(8, 26, 1, 72, 0, 72, 1),
(8, 27, 1, 69, 0, 69, 1),
(8, 28, 1, 71, 0, 71, 1),
(8, 29, 1, 70, 0, 70, 1),
(8, 30, 1, 68, 0, 68, 1),
(8, 31, 1, 74, 0, 74, 1),
(8, 32, 1, 75, 0, 75, 1),
(8, 33, 1, 73, 0, 73, 1),
(8, 34, 1, 71, 0, 71, 1),
(8, 35, 1, 72, 0, 72, 1),
(8, 36, 1, 74, 0, 74, 1);

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
  `student_id` int(11) NOT NULL,
  `classification_id` int(11) NOT NULL,
  `override_class` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `overriden_by` int(11) NOT NULL,
  `overriden_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `student_id` (`student_id`),
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
  ADD CONSTRAINT `classifications_ibfk_1` FOREIGN KEY (`classified_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_ibfk_1` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);

--
-- Constraints for table `officer_programmes`
--
ALTER TABLE `officer_programmes`
  ADD CONSTRAINT `officer_programmes_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `officer_programmes_ibfk_2` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);

--
-- Constraints for table `overrides`
--
ALTER TABLE `overrides`
  ADD CONSTRAINT `overrides_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `overrides_ibfk_2` FOREIGN KEY (`classification_id`) REFERENCES `classifications` (`id`),
  ADD CONSTRAINT `overrides_ibfk_3` FOREIGN KEY (`overriden_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`);
COMMIT;
