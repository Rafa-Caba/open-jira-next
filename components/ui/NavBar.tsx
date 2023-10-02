import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { UIContext } from '@/context/ui';

export const NavBar = () => {

    const { openSideMenu } = useContext( UIContext );

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={ openSideMenu }
                >
                    <MenuIcon />
                </IconButton>

                <NextLink href="/" passHref>
                    <Link underline='none' color="white">
                        <Typography variant='h6'>OpenJira</Typography>
                    </Link>
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}
