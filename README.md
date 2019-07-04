# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

| Culumn |  Type  |Options|
|:-------|--------|------:|
|name    |string  |null: false, index: true, unique: true|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members

## groupsテーブル

|Culumn| Type  |Options|
|:-----|-------|------:|
|name  |string |null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル

|Column|   Type   |Options|
|:-----|----------|------:|
|user  |references|null: false, foreign_key: true|
|group |references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|culumn |   Type   |Options|
|:------|----------|------:|
|message|text      | |
|image  |string    | |
|user   |references|null:false, foreign_key: true|
|group  |references|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
