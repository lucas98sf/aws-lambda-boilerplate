#! /bin/bash
# send-url-sqs get-text-ddb
lambdas=(save-text-ddb)

for l in ${lambdas[@]}; do
  aws iam create-role --role-name $l --assume-role-policy-document file://aws/trust-policy.json
  aws iam attach-role-policy --role-name $l --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  cd $l && npm i && npm run build 
  zip -r -D bundle.zip dist
  {
    aws lambda create-function --function-name $l \
    --zip-file fileb://bundle.zip --handler dist/main.handler --runtime nodejs16.x \
    --role arn:aws:iam::843942154494:role/$l
  } || aws lambda update-function-code --function-name $l --zip-file fileb://bundle.zip
  rm bundle.zip
  cd ../
done

# cd img-url-to-text && npm i && npm run build
# aws s3api put-object --bucket lambdas-testing-01 --body bundle.zip --key dir/img-url-to-text.zip