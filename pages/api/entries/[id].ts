import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: 'El ID no es valido ' + id });
    }
    
    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
        
        case 'GET':
            return getEntry( req, res );

        case 'DELETE':
            return deleteEntry( req, res );

        default:
            return res.status(400).json({ message: 'Metodo no existe ' + req.method });
    }
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { id } = req.query;

    await db.connect();
    const entryDeleted = await Entry.findByIdAndDelete( id );
    await db.disconnect();

    if ( !entryDeleted ) {
        return res.status(400).json({ message: 'No hay entradas con ese ID: ' + id });
    }

    res.status(200).json( entryDeleted! );
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    try {

        await db.connect();
        const entryGotten = await Entry.findById( id );
        await db.disconnect();

        if ( !entryGotten ) {
            return res.status(400).json({ message: 'No hay entradas con ese ID: ' + id });
        }

        res.status(200).json( entryGotten! );

    } catch (error: any) {

        console.log(error);
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });

    }
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;
    
    await db.connect();
    
    const entrytoUpate = await Entry.findById( id );

    if ( !entrytoUpate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entradas con ese ID: ' + id });
    }

    const {
        description = entrytoUpate.description,
        status = entrytoUpate.status
    } = req.body;

    try {

        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );

    } catch (error: any) {

        console.log(error);
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
        
    }
}