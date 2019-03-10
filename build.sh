 #!/bin/bash
if [ "$PAINTINLEDS_ENV" = "prod" ];then
   npm run-script build_prod
else
   npm run-script build_dev
fi
