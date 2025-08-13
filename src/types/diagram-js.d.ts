declare module "diagram-js/lib/features/rules/RuleProvider" {
  /**
   * EventBus interface (simplificado)
   * Representa el bus de eventos de diagram-js.
   */
  interface EventBus {
    on(event: string, callback: (payload: T) => void): void;
    fire(event: string, payload?: T): void;
  }

  /**
   * Datos del callback para `addRule`.
   * Representa la información que se pasa al intentar redimensionar formas.
   */
  interface ResizeRuleData {
    shape: {
      businessObject: {
        $instanceOf: (type: string) => boolean;
      };
    };
    newBounds?: {
      width: number;
      height: number;
    };
  }

  /**
   * Clase base para definir reglas en diagram-js.
   */
  class RuleProvider {
    constructor(eventBus: EventBus);
    /**
     * Agrega una regla al sistema.
     * @param {string} name - El nombre de la regla.
     * @param {number} priority - Prioridad de la regla.
     * @param {Function} callback - La función de callback que evalúa la regla.
     */
    addRule(
      name: string,
      priority: number,
      callback: (data: ResizeRuleData) => boolean
    ): void;
  }

  export default RuleProvider;
}
