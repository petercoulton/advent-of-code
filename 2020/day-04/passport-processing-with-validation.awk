BEGIN {
  RS="\n\n"
  OFS="\t"
  valid_passports = 0
  print "NR", "✅", "valid", "pnts", "?", "byr", "iyr", "eyr", "hgt", "ecl", "pid", "hcl", "cid"
}

{
  byr=0; iyr=0; eyr=0; hgt=0; ecl=0; pid=0; hcl=0; cid=0
}

/byr:(19[2-9][0-9]|200[0-2])/ { 
  byr=1 
}

/iyr:(201[0-9]|2020)/ { 
  iyr=1 
}

/eyr:(202[0-9]|2030)/ { 
  eyr=1 
}

/hgt:(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)/ { 
  hgt=1 
}

/ecl:(amb|blu|brn|gry|grn|hzl|oth)/{ 
  ecl=1 
}

/hcl:#([0-9a-f]{6})/ { 
  hcl=1 
}

/pid:([0-9]{9})/ { 
  for(i=1; i<=NF; i++) {
    where = match($i, /pid:/)
    if (where != 0 && length($i) == 13 ) {
      pid=1 
    }
  }
}

{
  points = byr+iyr+eyr+hgt+ecl+pid+hcl
  rslt = (points >= 7) ? "✅" : "❌"

  if (points >= 7) {
    valid=1
    valid_passports++
  } else {
    valid=0
  }

  print NR, valid_passports, valid, points, rslt, byr, iyr, eyr, hgt, ecl, pid, hcl, cid
}

END {
  printf "---\nFound %s valid passports out of %s\n", valid_passports, NR
}

