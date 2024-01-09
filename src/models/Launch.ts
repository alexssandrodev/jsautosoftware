import Part from "./Part"

export default interface Launch {
    id: string
    name: string
    date: string
    tel: string
    cpf: string
    model: string
    kilometer: string
    plate: string
    partsList: Part[]
}

