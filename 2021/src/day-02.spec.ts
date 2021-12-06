import { EventData, EventFrom, interpret } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { dayTwoInput } from './input'

const model = createModel({
  aim: 0,
  horizontalPosition: 0,
  depth: 0,
}, {
  events: {
    FORWARD: (dist: number) => ({ dist }),
    DOWN: (dist: number) => ({ dist }),
    UP: (dist: number) => ({ dist }),
    SWITCH_MODES: () => ({}),
  },
})

const machine = model.createMachine({
  id: 'submarine',
  initial: 'simple',
  context: model.initialContext,
  states: {
    simple: {
      on: {
        FORWARD: {
          actions: model.assign({
            horizontalPosition: (context, { dist }) => context.horizontalPosition + dist,
          }),
        },
        DOWN: {
          actions: model.assign({
            depth: (context, { dist }) => context.depth + dist,
          }),
        },
        UP: {
          actions: model.assign({
            depth: (context, { dist }) => context.depth - dist,
          }),
        },
        SWITCH_MODES: {
          target: 'advanced',
        },
      },
    },
    advanced: {
      on: {
        FORWARD: {
          actions: model.assign({
            horizontalPosition: (context, { dist }) => context.horizontalPosition + dist,
            depth: (context, { dist }) => context.depth + (context.aim * dist),
          }),
        },
        DOWN: {
          actions: model.assign({
            aim: (context, { dist }) => context.aim + dist,
          }),
        },
        UP: {
          actions: model.assign({
            aim: (context, { dist }) => context.aim - dist,
          }),
        },
      },
    },
  },
})

type Event = EventFrom<typeof model>
type EventType = Event['type']

describe('submarine', () => {
  it('should move around', async () => {
    const service = interpret(machine).start()

    const commands: Array<[ EventFrom<typeof model>['type'], EventData ]> = [
      [ 'FORWARD', { dist: 5 } ],
      [ 'DOWN', { dist: 5 } ],
      [ 'FORWARD', { dist: 8 } ],
      [ 'UP', { dist: 3 } ],
      [ 'DOWN', { dist: 8 } ],
      [ 'FORWARD', { dist: 2 } ],
    ]

    commands.forEach(([ command, payload ]) => service.send(command, payload))

    expect(service.state.context.horizontalPosition).toEqual(15)
    expect(service.state.context.depth).toEqual(10)
    expect(service.state.context.depth * service.state.context.horizontalPosition).toEqual(150)
  })
})

describe('day two', () => {
  const input = dayTwoInput<EventType>()

  describe('part one, navigating', () => {
    it('should move around a bit', async () => {
      const service = interpret(machine).start()

      input.forEach(([ command, payload ]) => service.send(command, payload))

      expect(service.state.context.horizontalPosition).toEqual(1909)
      expect(service.state.context.depth).toEqual(655)
      expect(service.state.context.depth * service.state.context.horizontalPosition).toEqual(1250395)
    })
  })
  describe('part two, advanced driving', () => {
    const service = interpret(machine).start()

    service.send('SWITCH_MODES')

    input.forEach(([ command, payload ]) => service.send(command, payload))

    expect(service.state.context.horizontalPosition).toEqual(1909)
    expect(service.state.context.depth).toEqual(760194)
    expect(service.state.context.depth * service.state.context.horizontalPosition).toEqual(1451210346)
  })
})
