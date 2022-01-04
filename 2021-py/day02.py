from functools import reduce, partial

input = open("./input/02.txt", "r")


def pitch_up(telemetry, angle):
    dist, depth, aim = telemetry
    return [dist, depth, aim - angle]


def pitch_down(telemetry, angle):
    dist, depth, aim = telemetry
    return [dist, depth, aim + angle]


def move_forward(telemetry, distance):
    dist, depth, aim = telemetry
    return [dist + distance, depth + (aim * distance), aim]


instruction_map = {
    'forward': lambda value: partial(move_forward, distance=int(value)),
    'up': lambda value: partial(pitch_up, angle=int(value)),
    'down': lambda value: partial(pitch_down, angle=int(value)),
}


def make_instruction(line: str):
    direction, value = line.split()
    return instruction_map.get(direction)(value)


def instructions(input):
    for instruction in map(make_instruction, input):
        yield instruction


def interpret_instruction(telemetry, instruction): return instruction(telemetry)


[dist, depth, aim] = reduce(interpret_instruction, instructions(input), [0, 0, 0])

answer = dist * aim
print(answer)
answer = dist * depth
print(answer)


# input = open("./input/02.txt", "r")
