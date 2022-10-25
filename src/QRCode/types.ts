export interface IQRCodeProps {
  codeValue: string
  size?: number
  fgColor?: string
  bgColor?: string
  errorCorrectLevel?:number  
}

export interface IPropsImg{
  codeValue: string
  size?: number
  margin?:number
  errorCorrectLevel?:'L'|'M'|'Q'|'H' 
}
export interface IPropsCanvas{
  codeValue: string
  fgColor?: string
  bgColor?: string
  size?: number
  margin?:number
  errorCorrectLevel?:'L'|'M'|'Q'|'H' ,
  onLoad?:Function
  onLoadEnd?:Function
}