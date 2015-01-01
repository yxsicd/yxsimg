#!/bin/bash

appid="mytestapp"
mkdir -p /tmp/${appid}
printf '#!/bin/bash

echo "yyy `date`" >> /tmp/xx.txt




' > /tmp/${appid}/main.sh
chmod -R a+x /tmp/${appid}
/tmp/${appid}/main.sh

