import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader, SectionHeader} from '../components/headers.js'
import {Calendar} from '../components/calendar.js'
import {TaskList} from '../components/taskList.js'
import {Task} from '../components/task.js'

import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { collection, query, where, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu5kOenTpJPdDS7Ith7pTza5apotgoHfI",
  authDomain: "uchi-316a4.firebaseapp.com",
  projectId: "uchi-316a4",
  storageBucket: "uchi-316a4.appspot.com",
  messagingSenderId: "990731445769",
  appId: "1:990731445769:web:f17681751db840acf93ad8",
  measurementId: "G-663HJZF6X5"
};

// FIrebase code starts here
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const citiesRef = collection(db, "cities");

// Create a query against the collection.
const q = query(citiesRef, where("state", "==", "CA"));
const querySnapshot = await getDoc(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

// Front-end 
const user = 'Kai';

const tasks = [{title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}];

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>UCHI | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath={"/icons/dashboard_gradient.png"} headertext={"Welcome, " + user + "!"} />
          <SectionHeader iconpath="/icons/calendar_duotone.png" headertext={"2022"} />
          <Calendar months={["Mar", "Apr", "May", "Jun", "Jul"]} />
          <SectionHeader iconpath="/icons/tasks_duotone.png" headertext="March Tasks" />
          <TaskList dashboard={true} tasks={tasks} />
        </div>
      </Layout>
    </div>
  )
}
