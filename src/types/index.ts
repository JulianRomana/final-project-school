export interface ProductInfos {
  _id: string
  topic: string
  lastModified: string
  id: number
  room: string
  isActive: boolean
  details: {
    type: string
    class: string
    usage: string
    _id: string
  }
  __v: number
}
export interface NodeType {
  coordinates: {
    x: number
    y: number
  }
  isActive: boolean
  _measurement: string
  topic: string
  name: string
  _time: string
  nodeId: number
  sensorId: number
}
