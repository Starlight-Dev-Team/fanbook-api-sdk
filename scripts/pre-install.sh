source ./scripts/check-name.sh;

if [ $? = 0 ]; then
  exit 0;
fi

npm install -g tsc tsc-alias;
