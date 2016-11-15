-- Group [Group]
create table `group_6` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module_6` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user_6` (
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
create table `post_5` (
   `oid`  integer  not null,
   `description`  longtext,
   `img`  varchar(255),
   `title`  varchar(255),
   `time`  datetime,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group_6`  add column  `module_6_oid`  integer;
alter table `group_6`   add index fk_group_6_module_6 (`module_6_oid`), add constraint fk_group_6_module_6 foreign key (`module_6_oid`) references `module_6` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module_6` (
   `group_6_oid`  integer not null,
   `module_6_oid`  integer not null,
  primary key (`group_6_oid`, `module_6_oid`)
);
alter table `group_module_6`   add index fk_group_module_6_group_6 (`group_6_oid`), add constraint fk_group_module_6_group_6 foreign key (`group_6_oid`) references `group_6` (`oid`);
alter table `group_module_6`   add index fk_group_module_6_module_6 (`module_6_oid`), add constraint fk_group_module_6_module_6 foreign key (`module_6_oid`) references `module_6` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user_6`  add column  `group_6_oid`  integer;
alter table `user_6`   add index fk_user_6_group_6 (`group_6_oid`), add constraint fk_user_6_group_6 foreign key (`group_6_oid`) references `group_6` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group_6` (
   `user_6_oid`  integer not null,
   `group_6_oid`  integer not null,
  primary key (`user_6_oid`, `group_6_oid`)
);
alter table `user_group_6`   add index fk_user_group_6_user_6 (`user_6_oid`), add constraint fk_user_group_6_user_6 foreign key (`user_6_oid`) references `user_6` (`oid`);
alter table `user_group_6`   add index fk_user_group_6_group_6 (`group_6_oid`), add constraint fk_user_group_6_group_6 foreign key (`group_6_oid`) references `group_6` (`oid`);


-- Post_User [rel1]
create table `post_user_5` (
   `post_5_oid`  integer not null,
   `user_6_oid`  integer not null,
  primary key (`post_5_oid`, `user_6_oid`)
);
alter table `post_user_5`   add index fk_post_user_5_post_5 (`post_5_oid`), add constraint fk_post_user_5_post_5 foreign key (`post_5_oid`) references `post_5` (`oid`);
alter table `post_user_5`   add index fk_post_user_5_user_6 (`user_6_oid`), add constraint fk_post_user_5_user_6 foreign key (`user_6_oid`) references `user_6` (`oid`);


-- User_Post [rel2]
alter table `user_6`  add column  `post_5_oid`  integer;
alter table `user_6`   add index fk_user_6_post_5 (`post_5_oid`), add constraint fk_user_6_post_5 foreign key (`post_5_oid`) references `post_5` (`oid`);


