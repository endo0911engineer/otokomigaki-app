'use client';

import styles from "../page.module.css";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setLoginError('');
            const userId = auth.currentUser.uid;

            router.push(`../mypage/${userId}`);
        } catch(error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.form_wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.form_item}>
                    <label for="email"></label>
                    <input name="email" type="email" placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className={styles.form_item}>
                    <input name="password" type="password" placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <div className={styles.button_panel}>
                    <button type="submit">
                        LOGIN
                    </button>
                </div>
            </form>

            {loginError && <div>
            {loginError}
            </div>}

            <div className={styles.form_footer}>
                <p>Dont have an account?<br /> 
                Create One　⇒　
                <Link href="../signup">here</Link>
                </p>
            </div>
            </div>
        </div>
    );
};