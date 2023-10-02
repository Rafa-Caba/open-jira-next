interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Pdsjdj  jdjas sdja aoow djsjjajndjs djsjsjdnwj ajasj.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En-Progreso: Pdsjdj  jdjas sdja aoow djsjjajndjs djsjsjdnwj ajasj.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Pdsjdj jdjas sdja aoow djsjjajndjs djsjsjdnwj ajasj.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}