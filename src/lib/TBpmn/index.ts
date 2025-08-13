import ColorPopupProvider from './colors/ColorPopupProvidet'
import ColorContextPadProvider from './colors/ColorContextPadProvider'
import TRenderDocument from './renders/TRenderDocument'
import TRenderDiamond from './renders/TRenderDiamond'
import TRenderTerminal from './renders/TRenderTerminal'
import TRenderConnector from './renders/TRenderConnector'
import TRenderLogicGate from './renders/TRenderLogicGate'
import TShapesProvider from './palette/TShapesProvider'
import TServiceTaskIcons from './palette/TServiceTaskIcons'
import TResize from './resize/TResize'
import TRenderText from './renders/TRenderText'
import TRenderMagneticTape from './renders/TRenderMagneticTape'
import TRenderStoredData from './renders/TRenderStoredData'

export default {
  __init__: [
    'colorContextPadProvider',
    'colorPopupProvider',
    'renderDocument',
    'renderDiamond',
    'renderTerminal',
    'renderConnector',
    'renderLogicGate',
    'renderMagneticTape',
    'renderStoredData',
    'renderText',
    'tShapesProvider',
    'serviceTasks',
    'tResize',
  ],
  colorContextPadProvider: ['type', ColorContextPadProvider],
  colorPopupProvider: ['type', ColorPopupProvider],
  renderDocument: ['type', TRenderDocument],
  renderDiamond: ['type', TRenderDiamond],
  renderTerminal: ['type', TRenderTerminal],
  renderConnector: ['type', TRenderConnector],
  renderLogicGate: ['type', TRenderLogicGate],
  renderText: ['type', TRenderText],
  renderMagneticTape: ['type', TRenderMagneticTape],
  renderStoredData: ['type', TRenderStoredData],
  tShapesProvider: ['type', TShapesProvider],
  serviceTasks: ['type', TServiceTaskIcons],
  tResize: ['type', TResize],
}
