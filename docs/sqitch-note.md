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
psql -d ojo -f data/seeding-sample.sql
```
### Structure mod "NewColumn"
```
sqitch add favorite -n 'NewColumn'
```