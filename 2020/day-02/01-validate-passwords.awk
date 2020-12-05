#!/usr/bin/env awk -f 

BEGIN {
  OFS=","
}

NR == 1 {
  print "password", "char", "min", "max", "actual",  "valid", "reason"
}

{
  split($1, policy, "-")
  min = policy[1]
  max = policy[2]
  required_char = substr($2,1,1)
  pwd = $3

  split(pwd, passwd, "")

  char_counts[required_char] = 0

  for (i in passwd) {
    char_counts[passwd[i]]++
  }

  passwd_valid = "false"
  if (char_counts[required_char] >= min && char_counts[required_char] <= max) {
    passwd_valid = "true"
  }

  reason = "-"
  if (passwd_valid ~ "true") {
    valid_count++
  } else {
    reason_message = "expected %s '%s's but found %s"
    if (char_counts[required_char] < min) {
      reason = sprintf(reason_message, min, required_char, char_counts[required_char])
    } else {
      reason = sprintf(reason_message, max, required_char, char_counts[required_char])
    }
  }

  print pwd, required_char, min, max, char_counts[required_char], passwd_valid, reason

  delete char_counts
}

END {
  printf "---\nTotal valid: %s\n", valid_count
}