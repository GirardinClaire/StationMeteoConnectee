pipass=raspberry;

echo "init repository...";
sshpass -p $pipass ssh pi@piensg028 "mkdir /home/pi/station && echo 'INFLUXDB_TOKEN=***' > /home/pi/station/.env";

echo "transfer files...";
sshpass -p $pipass scp -r DataRecorder/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Server/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Services/ pi@piensg028:/home/pi/station;

echo "start container & services...";
sshpass -p $pipass ssh pi@piensg028 "\
sudo cp /home/pi/station/Service/*.service /etc/systemd/system/ && \
sudo systemctl start meteoapi.service && \
sudo systemctl start meteodata.service && \
sudo systemctl enable meteoapi.service && \
sudo systemctl enable meteodata.service";

echo "done\nsetup terminé. Terminez l'installation de la base de données et renseignez un tocken R&W dans /home/pi/station/.etc, puis executez le script update_pi.sh";
