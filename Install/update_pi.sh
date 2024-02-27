pipass=raspberry;

echo "transfer files...";
sshpass -p $pipass scp -r DataRecorder/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Server/ pi@piensg028:/home/pi/station;
sshpass -p $pipass scp -r Services/ pi@piensg028:/home/pi/station;

echo "restart services...";
sshpass -p $pipass ssh pi@piensg028 "\
sudo cp /home/pi/station/Services/*.service /etc/systemd/system/ && \
sudo systemctl daemon-reload && \
sudo systemctl restart meteoapi.service && \
sudo systemctl restart meteodata.service";

echo "Update done";
