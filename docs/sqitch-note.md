#### Initialisation of sqitch
```
sqitch init ojo --engine pg --top-dir init --client psql --target develop
```
#### Creation of the structure
```
sqitch add structure -n 'Structure'
```
#### Creation of DB
```
createdb ojo
```
#### Deploy of structure
```
sqitch deploy develop
```
#### Revert script of structure
```
sqitch revert develop
```
#### Verify of structure ( deploy required )
```
sqitch verify develop
```
#### Seeding exe 
```
psql -d ojo -f data/seeding.sql
```
###  Mod "NewColumn favorite"
```
sqitch add favorite -n 'NewColumn'
```
###  Mod "NewColumn comment"
```
sqitch add comment -n 'New Column comment'
```
###  Mod "Rename table event_has_user"
```
sqitch add tablename -n 'New Table Name'
```
###  Mod "Rename table Favorite"
```
sqitch add tablenameV2 -n 'New Table Name'
```