-- Group [Group]
create table `group_7` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module_7` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user_7` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
   `last_name`  varchar(255),
   `first_name`  varchar(255),
  primary key (`oid`)
);


-- Post [ent1]
create table `post_6` (
   `oid`  integer  not null,
   `description`  longtext,
   `img`  varchar(255),
   `title`  varchar(255),
   `time`  datetime,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group_7`  add column  `module_7_oid`  integer;
alter table `group_7`   add index fk_group_7_module_7 (`module_7_oid`), add constraint fk_group_7_module_7 foreign key (`module_7_oid`) references `module_7` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module_7` (
   `group_7_oid`  integer not null,
   `module_7_oid`  integer not null,
  primary key (`group_7_oid`, `module_7_oid`)
);
alter table `group_module_7`   add index fk_group_module_7_group_7 (`group_7_oid`), add constraint fk_group_module_7_group_7 foreign key (`group_7_oid`) references `group_7` (`oid`);
alter table `group_module_7`   add index fk_group_module_7_module_7 (`module_7_oid`), add constraint fk_group_module_7_module_7 foreign key (`module_7_oid`) references `module_7` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user_7`  add column  `group_7_oid`  integer;
alter table `user_7`   add index fk_user_7_group_7 (`group_7_oid`), add constraint fk_user_7_group_7 foreign key (`group_7_oid`) references `group_7` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group_7` (
   `user_7_oid`  integer not null,
   `group_7_oid`  integer not null,
  primary key (`user_7_oid`, `group_7_oid`)
);
alter table `user_group_7`   add index fk_user_group_7_user_7 (`user_7_oid`), add constraint fk_user_group_7_user_7 foreign key (`user_7_oid`) references `user_7` (`oid`);
alter table `user_group_7`   add index fk_user_group_7_group_7 (`group_7_oid`), add constraint fk_user_group_7_group_7 foreign key (`group_7_oid`) references `group_7` (`oid`);


-- Post_User [rel1]
create table `post_user_6` (
   `post_6_oid`  integer not null,
   `user_7_oid`  integer not null,
  primary key (`post_6_oid`, `user_7_oid`)
);
alter table `post_user_6`   add index fk_post_user_6_post_6 (`post_6_oid`), add constraint fk_post_user_6_post_6 foreign key (`post_6_oid`) references `post_6` (`oid`);
alter table `post_user_6`   add index fk_post_user_6_user_7 (`user_7_oid`), add constraint fk_post_user_6_user_7 foreign key (`user_7_oid`) references `user_7` (`oid`);


-- User_Post [rel2]
alter table `user_7`  add column  `post_6_oid`  integer;
alter table `user_7`   add index fk_user_7_post_6 (`post_6_oid`), add constraint fk_user_7_post_6 foreign key (`post_6_oid`) references `post_6` (`oid`);


