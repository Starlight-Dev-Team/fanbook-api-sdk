name=$(node --experimental-json-modules -e "
  try {
    console.log(require('./package.json').name);
  } catch (e) {}
");

if [ "$name" == "@starlight-dev-team/fanbook-api-sdk" ]; then
  exit 1;
else
  exit 0;
fi
