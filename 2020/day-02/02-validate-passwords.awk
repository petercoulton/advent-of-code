#!/usr/bin/env awk -f 

BEGIN {
  OFS=","
}

NR == 1 {
  print "password", "char", "valid", "reason"
}

{
  split($1, policy, "-")
  required_char = substr($2,1,1)
  pos1 = policy[1]
  pos2 = policy[2]
  pwd = $3

  split(pwd, password, "")

  first_char_set = password[pos1] == required_char
  second_char_set = password[pos2] == required_char

  reason = "-"
  passwd_valid = (first_char_set && !second_char_set) || (!first_char_set && second_char_set) ? "true" : "false"

  if (passwd_valid ~ "true") {
    reason = "-"
    valid_count++
  } else if (first_char_set && second_char_set) {
    reason = "both position " pos1 " and " pos2 " contain " required_char
  } else {
    reason = "both position " pos1 " and " pos2 " do not contain " required_char
  }

  print pwd, required_char, passwd_valid, reason

  delete password
  delete policy
}

END {
  printf "---\nTotal valid: %s\n", valid_count
}