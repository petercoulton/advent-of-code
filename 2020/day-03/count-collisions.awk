BEGIN {
  collisions=0
}

NR == 1 {
  w = length($0)
  print "👉 " right " 👇 " down
}

# first position is always 1,1
NR == 1 {
  x = 1
  y = 1
}

NR > 1 && NR % down == 0 {
  x += right
  y += down
}

down > 1 && NR % down == 0 {
  print sprintf("%2d", NR), $0, sprintf(" (%2s,%2s)", x, y), sprintf("%3d", maxn), sprintf("%3d", n), pixel, pixel ~ "#" ? "X" : "O", NR % down == 0
  next
}

{
  n = ((y-1) * w) + (x-1) + 1
  idx = ((n - 1) % w) + 1
  maxn = y * w

  if (idx > maxn) {
    next
  }
}


{
  string_to_array($0, pixels)

  pixel = pixels[idx]
  pixels[idx] = "O"
  line = array_to_string(pixels)

  if (pixel ~ "#") {
    collisions++
  }

  print sprintf("%2d", NR), line, sprintf(" (%2s,%2s)", x, y), sprintf("%3d", maxn), sprintf("%3d", n), pixel, pixel ~ "#" ? "X" : "O", NR % down == 0
}

END {
  printf "---\nHit %s trees\n\n", collisions
}




function string_to_array(str, arr) {
  split(str, arr, "")
}

function array_to_string(arr) {
  line = ""
  for (i in arr) {
    line = line arr[i]
  }
  return line
}
