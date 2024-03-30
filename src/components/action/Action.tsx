import { FormEventHandler } from 'react'
import { Dependecy, useAction } from '../../../core/shared/infrastructure/Dependecy'
import { Action as ActionModel } from '../../../core/action/domain/Action'
import { usePresenter } from '../../hooks/use-presenter'
import './Action.scss'

export function Action() {
  const actionPresenter = Dependecy.use(useAction())
  const actionState = usePresenter(actionPresenter)

  const stopPropagation: FormEventHandler = (e) => {
    e.stopPropagation()
  }

  const updateAction = (a: ActionModel): FormEventHandler => {
    return (e) => {
      try {
        const { value } = e.target as HTMLInputElement
        actionPresenter.updateActionKeys(a.input, value)
      } catch (e) {
        // TODO: Show notification.
        console.error(e)
      }
    }
  }

  const removeAction = (a: ActionModel) => {
    return () => {
      actionPresenter.removeAction(a)
    }
  }

  const empty = () => {
    return !actionState.actions.length && (
      <p className="action-empty mt-3 text-black">
        You need to start the logs before creating macros, don't know how,
        check the <a href="">tutorial</a>
      </p>
    )
  }

  const actions = () => {
    return actionState.actions.map(a => (
      <tr key={a.timestamp} onClick={removeAction(a)}>
        <td>{a.input}</td>
        <td>
          <input
            type="text"
            onInput={updateAction(a)}
            onClick={stopPropagation}
            defaultValue={a.formatKeys()}
          />
        </td>
      </tr>
    ))
  }

  return (
    <div className="action br-1">
      <table className="table">
        <thead>
          <tr>
            <th>input</th>
            <th>keys</th>
          </tr>
        </thead>
        <tbody>
          {actions()}
        </tbody>
      </table>
      {empty()}
    </div>
  )
}
