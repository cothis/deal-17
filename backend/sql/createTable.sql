﻿-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- USER Table Create SQL
CREATE TABLE USER
(
    `ID`     INT             NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `EMAIL`  VARCHAR(200)    NOT NULL    COMMENT 'EMAIL', 
    CONSTRAINT PK_USER PRIMARY KEY (ID)
);

ALTER TABLE USER COMMENT 'USER';


-- CATEGORY Table Create SQL
CREATE TABLE CATEGORY
(
    `ID`          INT             NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `NAME`        VARCHAR(45)     NOT NULL    COMMENT 'NAME', 
    `IMAGE_PATH`  VARCHAR(500)    NOT NULL    COMMENT 'IMAGE_PATH', 
    CONSTRAINT PK_CATEGORY PRIMARY KEY (ID)
);

ALTER TABLE CATEGORY COMMENT 'CATEGORY';


-- PRODUCT Table Create SQL
CREATE TABLE PRODUCT
(
    `ID`           INT              NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `SUBJECT`      VARCHAR(500)     NOT NULL    COMMENT 'SUBJECT', 
    `CATEGORY_ID`  INT              NOT NULL    COMMENT 'CATEGORY_ID', 
    `PRICE`        INT              NULL        COMMENT 'PRICE', 
    `CONTENT`      VARCHAR(3000)    NULL        COMMENT 'CONTENT', 
    `SELLER_ID`    INT              NOT NULL    COMMENT 'SELLER_ID', 
    `STATE`        INT              NOT NULL    DEFAULT 0 COMMENT 'STATE', 
    `VIEWS`        INT              NOT NULL    DEFAULT 0 COMMENT 'VIEWS', 
    `CREATED_AT`   DATETIME         NOT NULL    DEFAULT now() COMMENT 'CREATED_AT', 
    CONSTRAINT PK_PRODUCT PRIMARY KEY (ID)
);

ALTER TABLE PRODUCT COMMENT 'PRODUCT';

CREATE INDEX IX_PRODUCT_1
    ON PRODUCT(CATEGORY_ID);

CREATE INDEX IX_PRODUCT_2
    ON PRODUCT(STATE);

ALTER TABLE PRODUCT
    ADD CONSTRAINT FK_PRODUCT_CATEGORY_ID_CATEGORY_ID FOREIGN KEY (CATEGORY_ID)
        REFERENCES CATEGORY (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE PRODUCT
    ADD CONSTRAINT FK_PRODUCT_SELLER_ID_USER_ID FOREIGN KEY (SELLER_ID)
        REFERENCES USER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- CHAT_ROOM Table Create SQL
CREATE TABLE CHAT_ROOM
(
    `ID`           INT    NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `PRODUCT_ID`   INT    NOT NULL    COMMENT 'PRODUCT_ID', 
    `SELLER_ID`    INT    NOT NULL    COMMENT 'SELLER_ID', 
    `CUSTOMER_ID`  INT    NOT NULL    COMMENT 'CUSTOMER_ID', 
    CONSTRAINT PK_CHAT_ROOM PRIMARY KEY (ID)
);

ALTER TABLE CHAT_ROOM COMMENT 'CHAT_ROOM';

CREATE INDEX IX_CHAT_ROOM_3
    ON CHAT_ROOM(CUSTOMER_ID);

CREATE INDEX IX_CHAT_ROOM_1
    ON CHAT_ROOM(PRODUCT_ID);

CREATE INDEX IX_CHAT_ROOM_2
    ON CHAT_ROOM(SELLER_ID);

ALTER TABLE CHAT_ROOM
    ADD CONSTRAINT FK_CHAT_ROOM_PRODUCT_ID_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES PRODUCT (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE CHAT_ROOM
    ADD CONSTRAINT FK_CHAT_ROOM_SELLER_ID_USER_ID FOREIGN KEY (SELLER_ID)
        REFERENCES USER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- TOWN Table Create SQL
CREATE TABLE TOWN
(
    `ID`    INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `NAME`  VARCHAR(45)    NOT NULL    COMMENT 'NAME', 
    CONSTRAINT PK_TOWN PRIMARY KEY (ID)
);

ALTER TABLE TOWN COMMENT 'TOWN';


-- USER_TOWN Table Create SQL
CREATE TABLE USER_TOWN
(
    `ID`       INT        NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `USER_ID`  INT        NOT NULL    COMMENT 'USER_ID', 
    `TOWN_ID`  INT        NOT NULL    COMMENT 'TOWN_ID', 
    `ACTIVE`   TINYINT    NOT NULL    COMMENT 'ACTIVE', 
    CONSTRAINT PK_USER_TOWN PRIMARY KEY (ID)
);

ALTER TABLE USER_TOWN COMMENT 'USER_TOWN';

CREATE INDEX IX_USER_TOWN_1
    ON USER_TOWN(USER_ID);

ALTER TABLE USER_TOWN
    ADD CONSTRAINT FK_USER_TOWN_USER_ID_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES USER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE USER_TOWN
    ADD CONSTRAINT FK_USER_TOWN_TOWN_ID_TOWN_ID FOREIGN KEY (TOWN_ID)
        REFERENCES TOWN (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- PICTURE Table Create SQL
CREATE TABLE PICTURE
(
    `ID`          INT             NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `PATH`        VARCHAR(500)    NOT NULL    COMMENT 'PATH', 
    `PRODUCT_ID`  INT             NOT NULL    COMMENT 'PRODUCT_ID', 
    CONSTRAINT PK_PICTURE PRIMARY KEY (ID)
);

ALTER TABLE PICTURE COMMENT 'PICTURE';

ALTER TABLE PICTURE
    ADD CONSTRAINT FK_PICTURE_PRODUCT_ID_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES PRODUCT (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- WISH Table Create SQL
CREATE TABLE WISH
(
    `ID`          INT    NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `USER_ID`     INT    NOT NULL    COMMENT 'USER_ID', 
    `PRODUCT_ID`  INT    NOT NULL    COMMENT 'PRODUCT_ID', 
    `IS_CHECKED`  BIT    NOT NULL    DEFAULT TRUE COMMENT 'IS_CHECKED', 
    CONSTRAINT PK_WISH PRIMARY KEY (ID)
);

ALTER TABLE WISH COMMENT 'WISH';

CREATE INDEX IX_WISH_3
    ON WISH(IS_CHECKED);

CREATE INDEX IX_WISH_2
    ON WISH(PRODUCT_ID);

CREATE INDEX IX_WISH_1
    ON WISH(USER_ID);

ALTER TABLE WISH
    ADD CONSTRAINT FK_WISH_USER_ID_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES USER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE WISH
    ADD CONSTRAINT FK_WISH_PRODUCT_ID_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES PRODUCT (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- MESSAGE Table Create SQL
CREATE TABLE MESSAGE
(
    `ID`            INT            NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `CHAT_ROOM_ID`  INT            NOT NULL    COMMENT 'CHAT_ROOM_ID', 
    `USER_ID`       INT            NOT NULL    COMMENT 'USER_ID', 
    `CONTENT`       VARCHAR(45)    NOT NULL    COMMENT 'CONTENT', 
    `IS_READ`       TINYINT        NOT NULL    DEFAULT 0 COMMENT 'IS_READ', 
    `CREATED_AT`    DATETIME       NOT NULL    DEFAULT now() COMMENT 'CREATED_AT', 
    CONSTRAINT PK_MESSAGE PRIMARY KEY (ID)
);

ALTER TABLE MESSAGE COMMENT 'MESSAGE';

CREATE INDEX IX_MESSAGE_1
    ON MESSAGE(CHAT_ROOM_ID);

CREATE INDEX IX_MESSAGE_2
    ON MESSAGE(IS_READ);

ALTER TABLE MESSAGE
    ADD CONSTRAINT FK_MESSAGE_CHAT_ROOM_ID_CHAT_ROOM_ID FOREIGN KEY (CHAT_ROOM_ID)
        REFERENCES CHAT_ROOM (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE MESSAGE
    ADD CONSTRAINT FK_MESSAGE_USER_ID_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES USER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


