import type {OfficeObject} from "~/components/Calculator/types";

export const OFFICES: OfficeObject[] = [
    {
        id: 0,
        city: 'Нижний Новгород',
        address: 'Гордеевская ул., 7 (этаж 1, офис 104)',
        phone: '+7 (987) 535-36-36',
        coords: [56.325215, 43.945970]
    },

    {
        id: 1,
        city: 'Санкт Петербург',
        address: 'Киевская 5 к 6',
        phone: '7 (930) 555-36-36',
        coords: [59.902961, 30.326405]
    },

    {
        id: 2,
        city: 'Владимир',
        address: 'Большая нижегородская 71',
        phone: '+7 986 888-36-36',
        coords: [56.141783, 40.436477]
    }
]
