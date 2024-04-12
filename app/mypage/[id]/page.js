'use client';

import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "@/app/components/firebase";

export default function Mypage({params}) {
    const [date,setDate] = useState('');
    const [happiness, setHappiness] = useState('');
    const [goal, setGoal] = useState('');
    const [task, setTask] = useState('');
    const [data, setData] = useState([]);
    const [documentId, setDocumentId] = useState([]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      if((date == '') || (happiness == '') || (goal == '') || (task == '')){
        alert('全ての内容を書き込みましょう')
      }else {
      addDoc(collection(db, `${params.id}`),{
        Date: date,
        Happiness: happiness,
        Goal: goal,
        Task: task
      });
      window.location.reload();
     }
    };

    useEffect(() => {
              const getData = collection(db, `${params.id}`);
              getDocs(getData).then((snapShot) => {
              setData(snapShot.docs.map((doc) => ({ ...doc.data() })));
             });
    },[]);

    useEffect(() => {
        const getDocumentId = collection(db, `${params.id}`);
        getDocs(getDocumentId).then((snapShot) => {
        setDocumentId(snapShot.docs.map((doc) => (doc.id)));
       });
    },[]);

    const handleDelete = async(index) =>{
      await deleteDoc(doc(db, `${params.id}`,documentId[index]));
      window.location.reload();
    }

    return (
        <div className={styles.mypage}>
            <div className={styles.form_wrapper}>
                <h1>Write today's diary entry</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_date}>
                        <label>DATE</label>
                        <input name="date" type="text" 
                        onChange={(e) => setDate(e.target.value)}
                        value={date}/>
                    </div>

                    <div className={styles.form_happiness}>
                        <label>Today's happiness</label>
                        <textarea name="happiness" 
                        onChange={(e) => setHappiness(e.target.value)}
                        value={happiness}/>
                    </div>

                    <div className={styles.form_goal}>
                        <label>Goal</label>
                        <textarea name="goal" 
                        onChange={(e) => setGoal(e.target.value)}
                        value={goal}/>
                    </div>

                    <div className={styles.form_task}>
                        <label>Tomorror's Task</label>
                        <textarea name="task" 
                        onChange={(e) => setTask(e.target.value)}
                        value={task}/>
                    </div>

                    <div className={styles.button_panel}>
                        <button type="submit">Write</button>
                    </div>
                </form>
            </div>

          <div className={styles.old_diary}>
          <h2>Your Old Diary</h2>
          <ul>
          {data.map((item, index) =>(
            <div className={styles.menu_item}>
                <a>{item.Date}</a>
                <li key={index} className={styles.drop_menu}>
                    <ul className={styles.drop_menu_list}>
                        <li className={styles.drop_menu_item}>{item.Happiness}</li>
                        <li className={styles.drop_menu_item}>{item.Goal}</li>
                        <li className={styles.drop_menu_item}>{item.Task}</li>
                        <li>
                            <button onClick={() =>  handleDelete(index)}>
                                Delete
                            </button>
                        </li>
                    </ul>
                </li>
            </div>
          ))}
          </ul>
          </div>
        </div>
    );
};