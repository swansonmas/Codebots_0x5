-- Comments [ent2]
create table `comments` (
   `oid`  integer  not null,
   `time`  datetime,
   `comment`  longtext,
   `author`  varchar(255),
   `postoid`  varchar(255),
  primary key (`oid`)
);


-- Post_Comments [rel2]
alter table `comments`  add column  `post_oid`  integer;
alter table `comments`   add index fk_comments_post (`post_oid`), add constraint fk_comments_post foreign key (`post_oid`) references `post` (`oid`);


