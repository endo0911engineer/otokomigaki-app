'use client';

import styles from "../page.module.css";
import { auth, db } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";

export default function SignUp() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [registerError, setRegisterError] = useState('');

    //SignUpボタンが押された時の処理
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = userCredential.user;
            await setDoc(doc(db, "users", uid), {
                Email: email,
                Password: password
            });
            setEmail("");
            setPassword("");
            router.push('../login');
        } catch (error) {
            setRegisterError(error.message);
        }
    };

    return (
        <div className={styles.signup}>
            <div className={styles.form_wrapper}>
                <h1>SignUp</h1>
                <form onSubmit={handleRegister}>
                    <div className={styles.form_item}>
                        <label for="email"></label>
                        <input name="email" type="email" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                    </div>
                    
                    <div className={styles.form_item}>
                        <label for="password"></label>
                        <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                    </div>
                    
                    <div className={styles.button_panel}>
                        <button type="submit">REGISTER</button>
                    </div>
                </form>
                
                {registerError && <div>
                    {registerError}
                </div>}
                
                <div className={styles.form_footer}>
                    <p>Already have an account? <br />
                    Login　⇒　<Link href="../login">here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};