'use client';

import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/app/components/firebase";

export default function Mypage({params}) {
    const [date,setDate] = useState('');
    const [happiness, setHappiness] = useState('');
    const [goal, setGoal] = useState('');
    const [task, setTask] = useState('');
    const [data, setData] = useState([]);

    //書き込みボタンをクリックしたときの処理
    const handleSubmit = async(e) => {
      e.preventDefault();
      if((date == '') || (happiness == '') || (goal == '') || (task == '')){
        alert('全ての内容を書き込みましょう')
      }else {
        await addDoc(collection(db, `${params.id}`),{
        Date: date,
        Happiness: happiness,
        Goal: goal,
        Task: task
      });

      // フォームをクリア 
      setDate(''); 
      setHappiness('');
      setGoal('');
      setTask('');

      // 新しいデータをリストに追加して表示
      const newData = {
        Date: date,
        Happiness: happiness,
        Goal: goal,
        Task: task
       };
     
       setData([newData, ...data]);
       }
    };

    //firebaseからデータの取得
    useEffect(() => {
              const getData = collection(db, `${params.id}`);
              getDocs(getData).then((snapShot) => {
              setData(snapShot.docs.map((doc) => ({ ...doc.data() })));
             });
    },[]);

    //削除ボタンを押したときの処理
    const handleDelete = async(index) =>{

        // firebaseからDocumentIdの取得
        const getDocumentId = collection(db, `${params.id}`);
        const snapShot = await getDocs(getDocumentId)
        const documentId = snapShot.docs.map((doc) => doc.id);

        const idToDelete = documentId[index];
        console.log("削除するドキュメントのID:", idToDelete);

        await deleteDoc(doc(db, `${params.id}`, idToDelete));
        window.location.reload();
    };

    return (
        <div className={styles.mypage}>
            <div className={styles.form_wrapper}>
                <h1>今日の日記をつけよう</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_date}>
                        <label>日付</label>
                        <input name="date" type="text" 
                        onChange={(e) => setDate(e.target.value)}
                        value={date}/>
                    </div>

                    <div className={styles.form_happiness}>
                        <label>今日の幸福</label>
                        <textarea name="happiness" 
                        onChange={(e) => setHappiness(e.target.value)}
                        value={happiness}/>
                    </div>

                    <div className={styles.form_goal}>
                        <label>目標</label>
                        <textarea name="goal" 
                        onChange={(e) => setGoal(e.target.value)}
                        value={goal}/>
                    </div>

                    <div className={styles.form_task}>
                        <label>明日やるべきこと</label>
                        <textarea name="task" 
                        onChange={(e) => setTask(e.target.value)}
                        value={task}/>
                    </div>

                    <div className={styles.button_panel}>
                        <button type="submit">書き込む</button>
                    </div>
                </form>
            </div>
          
          <div className={styles.old_diary}>
            <h2>過去の日記</h2>
            <ul>
                {data.map((item, index) =>(
                <div className={styles.menu_item}>
                    <a>{item.Date}</a>
                    <li key={index} className={styles.drop_menu}>
                        <ul className={styles.drop_menu_list}>
                            <li className={styles.drop_menu_item}>{item.Happiness}</li>
                            <li className={styles.drop_menu_item}>{item.Goal}</li>
                            <li className={styles.drop_menu_item}>{item.Task}</li>
                            <li className={styles.drop_menu_item}>
                                <button onClick={() =>  handleDelete(index)}>
                                    削除する
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