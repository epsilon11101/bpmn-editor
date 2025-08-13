import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider'

import EventBus from 'diagram-js/lib/core/EventBus'

export default class TResize extends RuleProvider {
  private taskResizingEnabled: boolean
  private eventResizingEnabled: boolean

  // Inyección de dependencias
  static $inject = [
    'eventBus',
    'config.taskResizingEnabled',
    'config.eventResizingEnabled',
  ]

  constructor(
    eventBus: EventBus,
    taskResizingEnabled: boolean = false,
    eventResizingEnabled: boolean = false // Valor predeterminado añadido
  ) {
    super(eventBus)
    this.taskResizingEnabled = taskResizingEnabled
    this.eventResizingEnabled = eventResizingEnabled
    this.init()
  }

  private init() {
    this.addRule('shape.resize', 1500, (data: ResizeRuleData) => {
      if (
        this.taskResizingEnabled &&
        data.shape.businessObject &&
        (data.shape.businessObject.$instanceOf('bpmn:Task') ||
          data.shape.businessObject.$instanceOf('bpmn:CallActivity') ||
          data.shape.businessObject.$instanceOf('bpmn:SubProcess'))
      ) {
        if (data.newBounds) {
          data.newBounds.width = Math.max(100, data.newBounds.width)
          data.newBounds.height = Math.max(40, data.newBounds.height)
        }

        return true
      } else if (
        this.eventResizingEnabled &&
        data.shape.businessObject &&
        data.shape.businessObject.$instanceOf('bpmn:Participant')
      ) {
        if (data.newBounds) {
          data.newBounds.width = Math.max(36, data.newBounds.width)
          data.newBounds.height = Math.max(36, data.newBounds.height)
        }
        return true
      }
      return false
    })
  }
}
