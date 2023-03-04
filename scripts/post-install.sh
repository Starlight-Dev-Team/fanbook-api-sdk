source ./scripts/check-name.sh;

if [ $? = 0 ]; then
  exit 0;
fi

npm run build;
