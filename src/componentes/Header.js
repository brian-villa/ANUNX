import * as React from 'react'
import { useSession } from "next-auth/client"
import { useState } from 'react'
import Link from 'next/link'

import { signOut } from 'next-auth/client'

import {
  Avatar,
  AppBar,
  Button,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'

import Menu from "@material-ui/core/Menu/Menu"
import MenuItem from "@material-ui/core/MenuItem"



import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle, } from '@material-ui/icons'


const useStyles = makeStyles((theme) =>({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    userName: {
      marginLeft: 6,
    },
    divider: {
      margin: "8px 0",
    }
}))



const ButtonAppBar = ({ APP_URL }) => {
  const classes = useStyles()
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  const [ session ] = useSession()


  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" className={classes.title}>
              Anunx
            </Typography>
            <Link href={session ? '/user/publish' : '/auth/singin'} passHref>
              <Button color="inherit" variant ="outlined">
                Anunciar e Vender
              </Button>
            </Link>
            {
              session
                ? (
                  <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    {
                      session.user.image 
                      ? <Avatar src={session.user.image} />
                      : <AccountCircle />
                    }
                    <Typography variant="subtitle2" color="secondary" className={classes.userName}>
                      {session.user.name}
                    </Typography>
                  </IconButton>
                ) : null
            }
            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Link href="/user/dashboard" passHref>
                <MenuItem>Meus anúncios</MenuItem>
              </Link>
              <Link href="/user/publish" passHref>
                <MenuItem>Publicar novo anúncio</MenuItem>
              </Link>
              <Divider className={classes.divider} />
              <MenuItem 
                onClick={() => signOut()}
              >
                Sair
              
              </MenuItem>
            </Menu>
              
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default ButtonAppBar