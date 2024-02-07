pipass=raspberry;

sshpass -p $pipass scp -r DataRecorder/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Server/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Service/ pi@piensg028:/home/pi/station;

sshpass -p $pipass ssh pi@piensg028 "\
sudo cp /home/pi/station/Service/*.service /etc/systemd/system/ && \
sudo systemctl daemon-reload && \
sudo systemctl restart meteoapi.service && \
sudo systemctl restart meteodata.service";

echo "Update terminé";
