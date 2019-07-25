# README


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|password|integer|null: false|
|email|string|null: false|


### Association
- has_many :comments
- has_many :groups, through: :members
- has_many :members

### 一意性制約
- add_index :users, :email, unique: true


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :comments
- has_many :users, through: :members
- has_many :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|特になし|
|image_url|string|特になし|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user