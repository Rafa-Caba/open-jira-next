import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '@/interfaces';
import { UIContext } from '@/context/ui';
import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { endDragging, startDragging } = useContext( UIContext );
    const router =  useRouter();

    const onDragStart = ( event: DragEvent ) => {
        // TODO: modificar el estado para indicar que se hace Drag
        event.dataTransfer.setData( 'text', entry._id );

        startDragging();
    }

    const onDraEnd = () => {
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

    return (
        <Card
            onClick={ onClick }
            sx={{ marginBottom: 1 }}
            // Eventos de Drag
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDraEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
