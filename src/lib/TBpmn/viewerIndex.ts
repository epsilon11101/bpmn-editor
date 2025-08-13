import TRenderConnector from './renders/TRenderConnector'
import TRenderDiamond from './renders/TRenderDiamond'
import TRenderDocument from './renders/TRenderDocument'
import TRenderLogicGate from './renders/TRenderLogicGate'
import TRenderMagneticTape from './renders/TRenderMagneticTape'
import TRenderStoredData from './renders/TRenderStoredData'
import TRenderTerminal from './renders/TRenderTerminal'
import TRenderText from './renders/TRenderText'

export const TBPMNViewerModel = {
  __init__: [
    'renderDocument',
    'renderDiamond',
    'renderTerminal',
    'renderConnector',
    'renderLogicGate',
    'renderText',
    'renderMagneticTape',
    'renderStoredData',
  ],
  renderDocument: ['type', TRenderDocument],
  renderDiamond: ['type', TRenderDiamond],
  renderTerminal: ['type', TRenderTerminal],
  renderConnector: ['type', TRenderConnector],
  renderLogicGate: ['type', TRenderLogicGate],
  renderText: ['type', TRenderText],
  renderMagneticTape: ['type', TRenderMagneticTape],
  renderStoredData: ['type', TRenderStoredData],
}
