-- Assigned_To [rel6]
alter table `post`  add column  `user_oid`  integer;
alter table `post`   add index fk_post_user (`user_oid`), add constraint fk_post_user foreign key (`user_oid`) references `user` (`oid`);


