#### Initialisation de sqith
```
sqitch init ojo --engine pg --top-dir init --client psql --target db:pg:ojo
```
#### Création de la structure
```
sqitch add structure -n 'Création du DDL'
```
#### Création de la DB
```
createdb ojo
```
#### Déploiement de la structure
```
sqitch deploy db:pg:ojo
```
