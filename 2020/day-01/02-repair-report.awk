#!/usr/bin/env awk -f
BEGIN {
  OFS=","
}

NR==1 {
  print "entry1", "entry2", "sum", "product"
}

{
  entries[NR] = $0;
}

END {
  for (i in entries) {
    for (j in entries) {      
      for (k in entries) {
        entry1 = entries[i]
        entry2 = entries[j]
        entry3 = entries[k]
        sum = entry1 + entry2 + entry3

        if (sum == 2020) {
          product = entry1 * entry2 * entry3
          print entry1, entry2, entry3, sum, product
          exit
        }
      }
    }
  }
}
