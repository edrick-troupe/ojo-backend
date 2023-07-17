#### Initialisation of sqitch
```
sqitch init ojo --engine pg --top-dir init --client psql --target db:pg:ojo
```
#### Creation of the structure
```
sqitch add structure -n 'Création du DDL'
```
#### Creation of DB
```
createdb ojo
```
#### Deploy of structure
```
sqitch deploy db:pg:ojo
```
#### Revert script of structure
```
sqitch revert db:pg:ojo
```
#### Verify of structure ( deploy required )
```
sqitch verify db:pg:ojo
```
#### Seeding exe 
```
psql -d ojo -f data/seeding-sample.sql
```
