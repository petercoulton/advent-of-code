input = open("input/01.txt", "r")

depths = tuple(map(int, input))
answer = sum(b > a for a, b in zip(depths, depths[1:]))
print(answer)

answer = sum(b > a for a, b in zip(depths, depths[3:]))
print(answer)
