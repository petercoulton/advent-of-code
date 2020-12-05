BEGIN {
  RS="\n\n"
  FS="([ ])|(\n)"
  OFS=","
  split("byr,iyr,eyr,hgt,hcl,ecl,pid,cid",required_fields,",")
}

/byr:/ {
  valid_fields+=1
}

/iyr:/ {
  valid_fields+=2
}

/eyr:/ {
  valid_fields+=4
}

/hgt:/ {
  valid_fields+=8
}

/hcl:/ {
  valid_fields+=16
}

/ecl:/ {
  valid_fields+=32
}

/pid:/ {
  valid_fields+=64
}

/cid:/ {
  valid_fields+=128
}

{
  if (and(127,valid_fields) == 127) {
    is_valid = "true"
    valid_passports++
  } else {
    is_valid = "false"
  }

  print NR, valid_fields, is_valid ~ "true" ? "valid" : "invalid"
  
  valid_fields=0
}

END {
  printf "---\nFound %s valid passports out of %s\n", valid_passports, NR
}
