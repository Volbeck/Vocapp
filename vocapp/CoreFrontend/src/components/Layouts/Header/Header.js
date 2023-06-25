import React from "react";
import styles from "./style.module.scss"
import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddIcon from '@mui/icons-material/Add';

export default function Header(){
    return(
        <header sx={{overflow:"hidden", maxWidth: "100%"}}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className={styles.element}>
                        <NavLink to="/modules/">Training modules</NavLink>
                    </div>
                    <div className={styles.element}>
                        <NavLink to="/folders/">Folders</NavLink>
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <img className={`${styles.profile} ${styles.link}`} src={Profile}/> */}
                    <AccountCircleOutlinedIcon sx={{ marginTop: '8px', float: 'right', fontSize: '55px', cursor: "pointer" }}/>
                    <div className={`${styles.add} ${styles.link}`} id="add">
                        <button className={styles.link}>
                            {/* <img src={Add}/> */}
                            <AddIcon></AddIcon>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}