import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyDJ-jJZ8q1lE5J81iSaS-OEX5zyS8YVx4g",
    authDomain: "firestore-crud-bffd2.firebaseapp.com",
    projectId: "firestore-crud-bffd2",
    storageBucket: "firestore-crud-bffd2.appspot.com",
    messagingSenderId: "932985182501",
    appId: "1:932985182501:web:dc61ac888b6222981922cc",
    measurementId: "G-87P2NJCEKY"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

export { db, analytics }
