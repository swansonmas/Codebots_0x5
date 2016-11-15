-- Group [Group]
create table `group_5` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module_5` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user_5` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
   `last_name`  varchar(255),
   `first_name`  varchar(255),
   `role`  varchar(255),
  primary key (`oid`)
);


-- Post [ent1]
create table `post_4` (
   `oid`  integer  not null,
   `description`  longtext,
   `img`  varchar(255),
   `title`  varchar(255),
   `time`  time,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group_5`  add column  `module_5_oid`  integer;
alter table `group_5`   add index fk_group_5_module_5 (`module_5_oid`), add constraint fk_group_5_module_5 foreign key (`module_5_oid`) references `module_5` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module_5` (
   `group_5_oid`  integer not null,
   `module_5_oid`  integer not null,
  primary key (`group_5_oid`, `module_5_oid`)
);
alter table `group_module_5`   add index fk_group_module_5_group_5 (`group_5_oid`), add constraint fk_group_module_5_group_5 foreign key (`group_5_oid`) references `group_5` (`oid`);
alter table `group_module_5`   add index fk_group_module_5_module_5 (`module_5_oid`), add constraint fk_group_module_5_module_5 foreign key (`module_5_oid`) references `module_5` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user_5`  add column  `group_5_oid`  integer;
alter table `user_5`   add index fk_user_5_group_5 (`group_5_oid`), add constraint fk_user_5_group_5 foreign key (`group_5_oid`) references `group_5` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group_5` (
   `user_5_oid`  integer not null,
   `group_5_oid`  integer not null,
  primary key (`user_5_oid`, `group_5_oid`)
);
alter table `user_group_5`   add index fk_user_group_5_user_5 (`user_5_oid`), add constraint fk_user_group_5_user_5 foreign key (`user_5_oid`) references `user_5` (`oid`);
alter table `user_group_5`   add index fk_user_group_5_group_5 (`group_5_oid`), add constraint fk_user_group_5_group_5 foreign key (`group_5_oid`) references `group_5` (`oid`);


-- Post_User [rel1]
create table `post_user_4` (
   `post_4_oid`  integer not null,
   `user_5_oid`  integer not null,
  primary key (`post_4_oid`, `user_5_oid`)
);
alter table `post_user_4`   add index fk_post_user_4_post_4 (`post_4_oid`), add constraint fk_post_user_4_post_4 foreign key (`post_4_oid`) references `post_4` (`oid`);
alter table `post_user_4`   add index fk_post_user_4_user_5 (`user_5_oid`), add constraint fk_post_user_4_user_5 foreign key (`user_5_oid`) references `user_5` (`oid`);


-- User_Post [rel2]
alter table `user_5`  add column  `post_4_oid`  integer;
alter table `user_5`   add index fk_user_5_post_4 (`post_4_oid`), add constraint fk_user_5_post_4 foreign key (`post_4_oid`) references `post_4` (`oid`);


