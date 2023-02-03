import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import {
    selectUserEmail,
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setUserLogout
} from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function Header() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const username = useSelector(selectUserName);
    const userphoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history("/home")
            }
        })
    }, [username])


    const handleAuth = () => {
        if (!username) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    setUser(result.user)
                }).catch((err) => {
                    console.log(err);
                })
        } else if (username) {
            auth.signOut().then(() => {
                dispatch(setUserLogout());
                history("/");
            }).catch((err) => {
                alert(err.message);
            });
        }
    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))
    }


    return (
        <Nav>
            <Logo>
                <img src='/images/logo.svg' alt='Disney+' />
            </Logo>
            {
                !username ? <Login onClick={handleAuth}>Login</Login> : <>
                    <NavMenu>
                        <a href='/'>
                            <img src='/images/home-icon.svg' alt='HOME' />
                            <span>
                                HOME
                            </span>
                        </a>
                        <a href='/'>
                            <img src='/images/search-icon.svg' alt='SEARCH' />
                            <span>
                                SEARCH
                            </span>
                        </a>
                        <a href='/'>
                            <img src='/images/watchlist-icon.svg' alt='WATCHLIST' />
                            <span>
                                WATCHLIST
                            </span>
                        </a>
                        <a href='/'>
                            <img src='/images/original-icon.svg' alt='ORIGINALS' />
                            <span>
                                ORIGINALS
                            </span>
                        </a>
                        <a href='/'>
                            <img src='/images/movie-icon.svg' alt='MOVIES' />
                            <span>
                                MOVIES
                            </span>
                        </a>
                        <a href='/'>
                            <img src='/images/series-icon.svg' alt='SERIES' />
                            <span>
                                SERIES
                            </span>
                        </a>
                    </NavMenu>

                    <SignOut>
                        <UserImg src={userphoto} alt={username} />
                        <DropDown>
                            <span onClick={handleAuth}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>
            }
        </Nav>
    )
};

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background-color: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151);
    border-radius: 4px;
    padding: 10px;
    letter-spacing: 3px;
    font-size:   14px ;
    width: 130px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
`


const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover{
        ${DropDown}{
            opacity: 1;
            transition-duration: 0.3s;
        }
    }
`




const UserImg = styled.img`
    border-radius: 50%;
        width: 100%;
        height: 100%;
`

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid;
    font-weight: 600;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: black;
        border-color: transparent;
    }
`

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-left: 25px;
    margin-right: auto;

    a {
        height: auto;
        margin-left: 20px;
        display: flex;

        img{
            height:20px ;
            width: 30px;
            min-width: 30px;
            z-index: auto;
        }

        span{
            display: flex;
            color: rgba(249, 249,249);
            letter-spacing: 1.42px;
            font-weight: 600;
            position: relative;
            padding: 2px 0px;
            font-size: 13px;
            white-space: nowrap;
            
            &:before{
                position: absolute;
                bottom: -6px;
                content: "";
                display: block;
                height: 2px;
                left: 0;
                width: 100%;
                border-radius: 0px 0px 4px 4px;
                transform: scaleX(0);
                opacity: 0;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform-origin: left center;
                background-color: rgba(249, 249,249);
            }
        }

        &:hover{
            span:before{
                transform: scaleX(1);
                opacity: 1 !important;
                visibility: visible;
            }
        }
    }
    

        
    @media (max-width: 768px) {
        display: none;
    }
`

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    display: inline-block;
    font-size: 0;
    max-height: 70px;

    img{
        display: block;
        width: 100%;
    }
`

const Nav = styled.nav`
    position: fixed;
    height: 70px;
    top: 0;
    left: 0;
    right: 0;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    padding: 0 36px;
    align-items: center;
    letter-spacing: 16px;
    z-index: 3;
`