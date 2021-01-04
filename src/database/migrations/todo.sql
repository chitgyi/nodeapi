CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` date NOT NULL DEFAULT CURRENT_TIMESTAMP
)
