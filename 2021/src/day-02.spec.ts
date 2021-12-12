import { EventData, EventFrom, interpret } from 'xstate'

import { EventType, machine, model } from './day-02'
import { dayTwoInput } from './input'

describe.only('Day 2: Dive!', () => {
  const input = dayTwoInput<EventType>()

  describe('part one', () => {
    describe('answer', () => {
      it('should move around a bit', async () => {
        const service = interpret(machine).start()

        input.forEach(([command, payload]) => service.send(command, payload))

        expect(service.state.context.horizontalPosition).toEqual(1909)
        expect(service.state.context.depth).toEqual(655)
        expect(
          service.state.context.depth * service.state.context.horizontalPosition
        ).toEqual(1250395)
      })
    })
  })

  describe('part two', () => {
    describe('answer', () => {
      it('should should move around a bit more', async () => {
        const service = interpret(machine).start()

        service.send('SWITCH_MODES')

        input.forEach(([command, payload]) => service.send(command, payload))

        expect(service.state.context.horizontalPosition).toEqual(1909)
        expect(service.state.context.depth).toEqual(760194)
        expect(
          service.state.context.depth * service.state.context.horizontalPosition
        ).toEqual(1451210346)
      })
    })
  })
})

describe('submarine', () => {
  it('should move around', async () => {
    const service = interpret(machine).start()

    const commands: Array<[EventFrom<typeof model>['type'], EventData]> = [
      ['FORWARD', { dist: 5 }],
      ['DOWN', { dist: 5 }],
      ['FORWARD', { dist: 8 }],
      ['UP', { dist: 3 }],
      ['DOWN', { dist: 8 }],
      ['FORWARD', { dist: 2 }],
    ]

    commands.forEach(([command, payload]) => service.send(command, payload))

    expect(service.state.context.horizontalPosition).toEqual(15)
    expect(service.state.context.depth).toEqual(10)
    expect(
      service.state.context.depth * service.state.context.horizontalPosition
    ).toEqual(150)
  })
})
