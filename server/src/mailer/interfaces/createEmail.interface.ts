export interface ICreateEmail {
    name: string
    surname: string
    middlename: string
    qrcode: string
    email: string
	id: number
    events:number[]
}

export interface ICreateEmail2 {
    name: string
    surname: string
    middlename: string
    qrcode: string
    email: string
    id:number
    events:number[]
    post: string
    organization: string
}
