-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
   `last_name`  varchar(255),
   `first_name`  varchar(255),
  primary key (`oid`)
);


-- Post [ent1]
create table `post` (
   `oid`  integer  not null,
   `time`  datetime,
   `description`  longtext,
   `img`  varchar(255),
   `imgblob`  longblob,
   `title`  varchar(255),
   `author`  varchar(255),
   `status`  varchar(255),
   `tag`  varchar(255),
   `location`  varchar(255),
  primary key (`oid`)
);


-- Comments [ent2]
create table `comments` (
   `oid`  integer  not null,
   `time`  datetime,
   `comment`  longtext,
   `author`  varchar(255),
   `postoid`  varchar(255),
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- Post_User [rel1]
alter table `user`  add column  `post_oid`  integer;
alter table `user`   add index fk_user_post (`post_oid`), add constraint fk_user_post foreign key (`post_oid`) references `post` (`oid`);


-- Post_Comments [rel2]
alter table `comments`  add column  `post_oid`  integer;
alter table `comments`   add index fk_comments_post (`post_oid`), add constraint fk_comments_post foreign key (`post_oid`) references `post` (`oid`);


-- Comments_Post [rel3]
create table `comments_post` (
   `comments_oid`  integer not null,
   `post_oid`  integer not null,
  primary key (`comments_oid`, `post_oid`)
);
alter table `comments_post`   add index fk_comments_post_comments (`comments_oid`), add constraint fk_comments_post_comments foreign key (`comments_oid`) references `comments` (`oid`);
alter table `comments_post`   add index fk_comments_post_post (`post_oid`), add constraint fk_comments_post_post foreign key (`post_oid`) references `post` (`oid`);


-- Post_User_2 [rel4]
create table `post_user_2` (
   `post_oid`  integer not null,
   `user_oid`  integer not null,
  primary key (`post_oid`, `user_oid`)
);
alter table `post_user_2`   add index fk_post_user_2_post (`post_oid`), add constraint fk_post_user_2_post foreign key (`post_oid`) references `post` (`oid`);
alter table `post_user_2`   add index fk_post_user_2_user (`user_oid`), add constraint fk_post_user_2_user foreign key (`user_oid`) references `user` (`oid`);


-- Comments_Comments [rel5]
alter table `comments`  add column  `comments_oid`  integer;
alter table `comments`   add index fk_comments_comments (`comments_oid`), add constraint fk_comments_comments foreign key (`comments_oid`) references `comments` (`oid`);


