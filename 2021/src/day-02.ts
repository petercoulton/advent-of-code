import { createModel } from 'xstate/lib/model'
import { EventFrom } from 'xstate'

export const model = createModel(
  {
    aim: 0,
    horizontalPosition: 0,
    depth: 0,
  },
  {
    events: {
      FORWARD: (dist: number) => ({ dist }),
      DOWN: (dist: number) => ({ dist }),
      UP: (dist: number) => ({ dist }),
      SWITCH_MODES: () => ({}),
    },
  }
)

export const machine = model.createMachine({
  id: 'submarine',
  initial: 'simple',
  context: model.initialContext,
  states: {
    simple: {
      on: {
        FORWARD: {
          actions: model.assign({
            horizontalPosition: (context, { dist }) =>
              context.horizontalPosition + dist,
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
            horizontalPosition: (context, { dist }) =>
              context.horizontalPosition + dist,
            depth: (context, { dist }) => context.depth + context.aim * dist,
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

export type Event = EventFrom<typeof model>
export type EventType = Event['type']
