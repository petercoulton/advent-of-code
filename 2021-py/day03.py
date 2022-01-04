from functools import reduce, partial

input = open('./examples/03.txt', 'r')

lines = input.read().splitlines()
bits = len(lines[0]) - 1

columns = reduce(lambda res, line: [line[i] for i in range(bits)], [[row[i] for row in lines] for i in range(bits)], [])

print(columns)
