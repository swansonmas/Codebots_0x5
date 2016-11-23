-- Comments_Comments [rel5]
alter table `comments`  add column  `comments_oid`  integer;
alter table `comments`   add index fk_comments_comments (`comments_oid`), add constraint fk_comments_comments foreign key (`comments_oid`) references `comments` (`oid`);


