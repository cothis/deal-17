insert into USER(email) values('test1@dev.com');
insert into USER(email) values('test2@dev.com');
insert into USER(email) values('test3@dev.com');

insert into CATEGORY(NAME, IMAGE_PATH) values('디지털기기', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('생활가전', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('가구/인테리어', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('게임/취미', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('생활/가공식품', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('스포츠/레저', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('여성패션/잡화', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('남성패션/잡화', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('유아통', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('뷰티/미용', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('반려동물', '/');
insert into CATEGORY(NAME, IMAGE_PATH) values('도서/티켓/음반', '/');

insert into PRODUCT(SUBJECT, CATEGORY_ID, PRICE, CONTENT, SELLER_ID)
values('디지털기기', 1, 3000, '디지털기기 팔아요', 1);   
insert into PRODUCT(SUBJECT, CATEGORY_ID, PRICE, CONTENT, SELLER_ID)
values('디지털기기 유저2', 1, 2000, '디지털기기 팝니다', 2);   
insert into PRODUCT(SUBJECT, CATEGORY_ID, PRICE, CONTENT, SELLER_ID)
values('생활가전 유저1', 2, 3000, '가전입니다', 1);   
insert into PRODUCT(SUBJECT, CATEGORY_ID, PRICE, CONTENT, SELLER_ID)
values('생활가전 유저1 가격미정', 1, null, '디지털기기 팔아요', 1);   
insert into PRODUCT(SUBJECT, CATEGORY_ID, PRICE, CONTENT, SEELER_ID)
values('디지털가전 팔아요', 1, 5000, '디지털가전이 진짜 쌉니다', 1);