-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 12:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mingle`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `comment`, `created_at`) VALUES
(1, 1, 3, 'Nice!', '2025-06-30 20:55:20'),
(2, 1, 4, 'Congrats!', '2025-06-30 20:55:20'),
(3, 2, 8, 'Hi Ahmed', '2025-06-30 20:55:20'),
(4, 3, 11, 'Keep going Navera', '2025-06-30 20:55:20'),
(5, 6, 12, 'Haha nice', '2025-06-30 20:55:20'),
(6, 6, 7, 'Agreed!', '2025-06-30 20:55:20'),
(23, 3, 2, 'yesssss', '2025-07-05 21:57:27'),
(31, 18, 2, 'yes', '2025-07-05 22:39:51'),
(32, 21, 2, 'ok', '2025-07-05 22:43:01'),
(33, 8, 2, 'WOW', '2025-07-05 23:04:39'),
(34, 17, 2, 'Nice', '2025-07-06 01:34:30'),
(35, 18, 2, 'lets goooooooo', '2025-07-06 01:44:04'),
(45, 16, 3, 'awesome', '2025-07-06 02:28:57'),
(58, 18, 3, '77', '2025-07-06 03:00:37'),
(59, 18, 3, 'yo', '2025-07-06 10:13:27'),
(61, 16, 3, 'Yessir', '2025-07-06 10:59:42'),
(62, 17, 3, 'yes', '2025-07-06 11:10:36'),
(70, 21, 2, 'hi', '2025-07-06 20:17:09'),
(71, 27, 2, 'cool', '2025-07-06 20:20:41'),
(72, 21, 2, 'Hey', '2025-07-07 08:08:17'),
(73, 28, 3, 'Yessir', '2025-07-07 08:26:24'),
(74, 21, 2, 'Yessir', '2025-07-07 08:35:47'),
(75, 28, 3, 'My G', '2025-07-07 08:43:41');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `followed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower_id`, `following_id`, `followed_at`) VALUES
(2, 3, '2025-07-07 08:39:56'),
(2, 4, '2025-07-07 08:52:48'),
(2, 8, '2025-07-06 01:33:17'),
(3, 2, '2025-07-07 08:43:47'),
(3, 20, '2025-07-07 08:43:56'),
(4, 2, '2025-06-30 20:55:20'),
(6, 4, '2025-06-30 20:55:20'),
(7, 8, '2025-06-30 20:55:20'),
(8, 3, '2025-06-30 20:55:20'),
(11, 8, '2025-06-30 20:55:20'),
(12, 11, '2025-06-30 20:55:20');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `user_id`, `created_at`) VALUES
(1, 1, 3, '2025-06-30 20:55:20'),
(2, 1, 4, '2025-06-30 20:55:20'),
(4, 3, 8, '2025-06-30 20:55:20'),
(5, 6, 12, '2025-06-30 20:55:20'),
(6, 6, 7, '2025-06-30 20:55:20'),
(7, 7, 6, '2025-06-30 20:55:20'),
(54, 4, 2, '2025-07-02 14:37:59'),
(55, 1, 2, '2025-07-02 14:42:02'),
(62, 14, 2, '2025-07-03 15:52:10'),
(63, 15, 2, '2025-07-03 15:52:11'),
(95, 17, 2, '2025-07-03 19:25:49'),
(120, 8, 2, '2025-07-04 09:55:04'),
(121, 21, 20, '2025-07-04 11:14:33'),
(122, 2, 20, '2025-07-04 11:14:36'),
(132, 16, 2, '2025-07-05 16:40:13'),
(143, 3, 2, '2025-07-05 22:02:54'),
(144, 18, 2, '2025-07-05 22:10:47'),
(145, 21, 3, '2025-07-06 01:58:25'),
(146, 18, 3, '2025-07-06 02:02:36'),
(149, 17, 3, '2025-07-06 02:04:20'),
(150, 16, 3, '2025-07-06 10:55:43'),
(159, 2, 2, '2025-07-06 20:19:24'),
(160, 27, 2, '2025-07-06 20:20:36'),
(161, 21, 2, '2025-07-07 08:35:50'),
(162, 28, 3, '2025-07-07 08:43:34'),
(163, 28, 2, '2025-07-07 08:53:37'),
(164, 7, 2, '2025-07-07 08:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `type` enum('like','comment','follow','mention') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `post_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `from_user_id`, `type`, `created_at`, `post_id`, `message`, `is_read`) VALUES
(8, 2, 3, 'like', '2025-07-06 10:55:43', 18, '@ahmed liked your post', 1),
(9, 2, 3, 'comment', '2025-07-06 11:10:36', 17, '@ahmed commented on your post', 1),
(10, 3, 2, 'follow', '2025-07-06 15:20:15', NULL, NULL, 1),
(11, 3, 2, 'comment', '2025-07-06 20:17:09', 21, '@m commented on your post', 1),
(12, 3, 2, 'like', '2025-07-06 20:19:24', 2, '@m liked your post', 1),
(13, 3, 2, 'follow', '2025-07-06 20:20:18', NULL, NULL, 1),
(14, 3, 2, 'comment', '2025-07-07 08:08:17', 21, '@m commented on your post', 1),
(15, 2, 3, 'comment', '2025-07-07 08:26:24', 28, '@ahmed commented on your post', 1),
(16, 3, 2, 'comment', '2025-07-07 08:35:47', 21, '@m commented on your post', 1),
(17, 3, 2, 'like', '2025-07-07 08:35:50', 21, '@m liked your post', 1),
(18, 3, 2, 'follow', '2025-07-07 08:39:56', NULL, NULL, 1),
(19, 2, 3, 'like', '2025-07-07 08:43:34', 28, '@ahmed liked your post', 1),
(20, 2, 3, 'comment', '2025-07-07 08:43:41', 28, '@ahmed commented on your post', 1),
(21, 2, 3, 'follow', '2025-07-07 08:43:47', NULL, NULL, 1),
(22, 20, 3, 'follow', '2025-07-07 08:43:56', NULL, NULL, 0),
(23, 4, 2, 'follow', '2025-07-07 08:52:48', NULL, NULL, 0),
(24, 11, 2, 'like', '2025-07-07 08:53:42', 7, '@m liked your post', 0),
(25, 11, 2, 'follow', '2025-07-07 08:53:56', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `created_at`) VALUES
(1, 2, 'First post by m!', '2025-06-30 20:55:20'),
(2, 3, 'Hi from Ahmed.', '2025-06-30 20:55:20'),
(3, 4, 'Navera sharing thoughts', '2025-06-30 20:55:20'),
(4, 6, 'aa posting now', '2025-06-30 20:55:20'),
(5, 7, 'Z says hello', '2025-06-30 20:55:20'),
(6, 8, 'Goldy coding day', '2025-06-30 20:55:20'),
(7, 11, 'Micha loves web dev', '2025-06-30 20:55:20'),
(8, 12, 'MJ4 figured it out', '2025-06-30 20:55:20'),
(14, 2, 'Yessir', '2025-07-03 15:43:59'),
(15, 2, 'yt', '2025-07-03 15:50:38'),
(16, 2, 'i am him', '2025-07-03 15:52:01'),
(17, 2, 'cool', '2025-07-03 15:53:01'),
(18, 2, 'I am M', '2025-07-03 20:01:10'),
(21, 3, 'Ahmed', '2025-07-04 10:51:39'),
(27, 2, 'Yes', '2025-07-06 20:08:37'),
(28, 2, 'Yessir', '2025-07-06 20:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `reset_code` varchar(6) DEFAULT NULL,
  `reset_code_expiry` datetime DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `about` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT 'pp.jpg',
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `reset_token`, `reset_token_expiry`, `reset_code`, `reset_code_expiry`, `first_name`, `last_name`, `gender`, `about`, `location`, `profile_pic`, `last_login`, `is_active`) VALUES
(2, 'm', 'm@gmail.com', '$2y$12$TWmd9tmtXj0GdynfLQFEcuI35ftzF69EgxmymrOvToFWGtXNSL60u', '2025-06-19 13:26:53', NULL, NULL, NULL, NULL, 'Michael', 'James', 'Male', 'I AM SO AWESOME', 'Poland', '/PROJECT/General/pp.jpg', NULL, 1),
(3, 'ahmed', 'ahmed@gmail.com', '$2y$12$27WHDDPU5W/2LL92RTs.tO22rdYyY4L8FHxZt6EaDbzuOyTymghOm', '2025-06-19 15:27:16', NULL, NULL, NULL, NULL, 'Ahmed', 'Khan', 'Male', 'I am him', 'Kenya', '/PROJECT/General/pp.jpg', NULL, 1),
(4, 'Navera', 'Navera@gmail.com', '$2y$10$xgH2rRrO3dIHY1jy/vX4xuukEvah/7XQ4h1Rt.M83q...', '2025-06-19 16:06:14', NULL, NULL, NULL, NULL, 'Navera', 'Ali', 'Female', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(5, 'Nav', 'Nara@gmail.com', '$2y$10$/udyBaXtEey9zE.eJkWlAunHcWNmqo9VGsLTrQgoV0...', '2025-06-19 16:06:42', NULL, NULL, NULL, NULL, 'Navid', 'Rahman', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(6, 'aa', 'aa@gmail.com', '$2y$10$YSLufbMBmrBJz5G99lR9e.0LcLqrhM0SXWvhUtrRgQd...', '2025-06-19 16:07:16', NULL, NULL, NULL, NULL, 'Amina', 'Abdi', 'Female', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(7, 'z', 'z@gmail.com', '$2y$10$Y/HT6oGNKBxyU8o7pn4DtU4FQTJWCjCGBPYnKnfki...', '2025-06-19 16:09:42', NULL, NULL, NULL, NULL, 'Zain', 'Hassan', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(8, 'goldy', 'goldy@gmail.com', '$2y$10$aYu5aJQbY4rH7dAx9gYq7O/Z7cTrTNvSidEL0Zm...', '2025-06-13 10:20:46', NULL, NULL, NULL, NULL, 'Goldy', 'Mukami', 'Other', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(11, 'Micha', 'MichaelJackson@gmail.com', '$2y$12$5ZOi2fXNDc8StXLneyCdjutMLEGO10CEv2htQPQXEWB8XHwWQVxIO', '2025-06-29 22:39:44', NULL, NULL, NULL, NULL, 'Michael', 'Jackson', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(12, 'MJ4', 'MJ@gmail.com', '$2y$12$dsgdhICSKSMGT1.Tt33bDujo5v.YXQbcfDq1GqIbKLIgtRhe9LTH.', '2025-06-29 23:08:46', NULL, NULL, NULL, NULL, 'Mal', 'Colm', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(13, 'jane', 'jane@gmail.com', '$2y$12$sdvB4akKHr7cSr6fiqHrROXuDfh.KKu8o.TmsVRFH0RrGECk2UObi', '2025-06-30 10:22:36', NULL, NULL, NULL, NULL, 'Prit', 'Jane', 'Female', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(14, 'goldenG', 'g@gmail.com', '$2y$12$O1XU2QhVFRjLo2KCRg25OeRcN.3qE5DtChq8vHQmYVsQPqh3hjJfO', '2025-06-30 12:01:37', NULL, NULL, NULL, NULL, 'goldy', 'golden', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(15, 'Julia', 'Julia@gmail.com', '$2y$12$h6NBIC4oxv4pYEt.t5Ec3.Ojd7JKi0X5lIGOrKZOEI1WFw150B1gS', '2025-07-04 10:53:23', NULL, NULL, NULL, NULL, 'Julia', 'Khan', 'Female', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(17, 'YM', 'Yohn@gmail.com', '$2y$12$K9M/FeJD1fB/Z4sUTJZUz.2Xd2Q8JgwjnWp8sPhu8oOrlLunUrPfm', '2025-07-04 11:02:07', NULL, NULL, NULL, NULL, 'Yohn', 'Mike', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(19, 'Mj', 'Mj1@gmail.com', '$2y$12$IiT0BOBBWCyIFKA275by9.TI8bEQw7A9oFHDtB1rQS8MlFtOQ3BtW', '2025-07-04 11:08:50', NULL, NULL, NULL, NULL, 'mJ', 'YT', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1),
(20, 'Cadi', 'Cadi@gmail.com', '$2y$12$EVu7JbU2VqFeBLOJb30.1u1.yWWvQnO75TNnlFQCq8ln7axL7K9Ve', '2025-07-04 11:13:26', NULL, NULL, NULL, NULL, 'Cadi', 'Dan', 'Male', NULL, NULL, '/PROJECT/General/pp.jpg', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`follower_id`,`following_id`),
  ADD KEY `following_id` (`following_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `from_user_id` (`from_user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
