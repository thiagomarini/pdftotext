#!/usr/bin/env bats

url="http://localhost:8080/cgi-bin/pdftotext"
pdf="$BATS_TEST_DIRNAME/fixtures/fw4.pdf"
txt="$BATS_TEST_DIRNAME/fixtures/fw4.txt"

@test "Simple upload returns a 200" {
  run curl -s -H "Expect:" -i -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "OPTIONS returns a 200" {
  run curl -s -H "Expect:" -i -X OPTIONS "$url"
  [ "$status" -eq 0 ]

  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "204" ]

  header=$(echo ${lines[3]} | cut -d ' ' -f1)
  [ "$header" = "Access-Control-Allow-Origin:" ]

  header=$(echo ${lines[4]} | cut -d ' ' -f1)
  [ "$header" = "Access-Control-Allow-Methods:" ]

  header=$(echo ${lines[5]} | cut -d ' ' -f1)
  [ "$header" = "Access-Control-Allow-Headers:" ]
}

@test "GET returns a 405" {
  run curl -s -H "Expect:" -i -X GET "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "405" ]
}

@test "POST upload returns a 200" {
  run curl -s -H "Expect:" -i -X POST -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "PUT upload returns a 200" {
  run curl -s -H "Expect:" -i -X PUT -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "DELETE upload returns a 405" {
  run curl -s -H "Expect:" -i -X DELETE -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "405" ]
}

@test "Accept */* returns a 200" {
  run curl -s -H "Expect:" -i -H 'Accept: */*' -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "Accept text/plain returns a 200" {
  run curl -s -H "Expect:" -i -H 'Accept: */*' -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "Accept application/json returns a 406" {
  run curl -s -H "Expect:" -i -H 'Accept: application/json' -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "406" ]
}

@test "Upload application/pdf returns a 200" {
  run curl -s -H "Expect:" -i -H 'Content-Type: application/pdf' -T "$pdf" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "200" ]
}

@test "Upload text/plain returns a 415" {
  run curl -s -H "Expect:" -i -H 'Content-Type: text/plain' -T "$txt" "$url"
  [ "$status" -eq 0 ]
  code=$(echo ${lines[0]} | cut -d ' ' -f2)
  [ "$code" = "415" ]
}
