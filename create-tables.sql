CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `password_hash` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 

CREATE TABLE `otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` int(11) NOT NULL,
  `expires_in_minute` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 

CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(11) NOT NULL,
  `price` int(11) NOT NULL,
  `author` varchar(11) NOT NULL,
  `title` varchar(11) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 

CREATE TABLE `posts`(
  `postid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(220) NOT NULL,
   `image_url` TEXT,
   `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `none` varchar(40) NOT NULL,
  `idade` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1