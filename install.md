# Notice d'installation

## Docker

### Installation

- Dans un terminal
```
cd DataRecorder/Docker
docker compose up -d
```

- Dans un navigateur:
``̀
http://{ip}:8086
```
Puis renseigner les valeurs suivantes:

username : `piensg`  
password :  `M$g7~}$LfnC%&uU`  
initial organisation name: `ensg`  
initial bucket name: `meteo`  

### Supression définitive

```
docker compose down
docker volume rm docker_influxdb-storage
```
