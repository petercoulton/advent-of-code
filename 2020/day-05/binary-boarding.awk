BEGIN {
  OFS="\t"
  FS=","
}

NR == 1 {
  print "NR", "row", "col", "id"
}

NF > 1 {
  row=$2
  column=$3
  seat=$4
}

{
  row = bsp(0, 127, substr($1,1,7), "B", "F")
  col = bsp(0, 7, substr($1,8,3), "R", "L")

  id = row * 8 + col

  print NR, row, col, id, r, c
}

END {
}


function bsp(lower, upper, moves_string, a, b) {
  split(moves_string, moves, "")

  step = int((upper + 1) / 2)

  for (i in moves) {
    move = moves[i]
    if (move ~ a) {
      lower += step
    } else {
      upper -= step
    }
    step = step / 2
  }

  return lower
}

